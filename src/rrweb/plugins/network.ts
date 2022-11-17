/* eslint-disable */

let isInitiated = false;

export const networkPlugin = {
  name: 'bugflow/network@1',
  observer(cb: Function) {
    if (isInitiated) {
      return () => null;
    }

    isInitiated = true;

    const oldXHROpen = window.XMLHttpRequest.prototype.open;
    const oldXHRSend = window.XMLHttpRequest.prototype.send;

    // @ts-ignore
    window.XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      async: boolean,
      username?: string | null,
      password?: string | null
    ) {
      this.addEventListener('load', function () {
        let data = {};

        try {
          // @ts-ignore
          const originalBody = this.__desertlion_xhr_body__?.[0];
          if (typeof originalBody === 'string' && originalBody[0] === '{') {
            data = JSON.parse(originalBody);
          }
        } catch (error) {}

        cb({
          event: {
            type: 'network',
            method: method,
            url,
            requestBody: data,
            response: this.response,
            status: this.status,
            headers: this.getAllResponseHeaders(),
          },
          timestamp: Date.now(),
        });
      });

      return oldXHROpen.apply(this, [method, url, async, username, password]);
    };

    window.XMLHttpRequest.prototype.send = function (...params) {
      // @ts-ignore
      this.__desertlion_xhr_body__ = params;

      return oldXHRSend.apply(this, params);
    };

    if ('fetch' in window) {
      // @ts-ignore
      window.fetch = new Proxy(window.fetch, {
        apply(fetch, that, args) {
          let method = '';
          let url = '';
          let requestBody = '';

          url = args?.[0];
          const config = args?.[1];

          if (config) {
            method = config?.method;
            requestBody = config?.body;
          }

          if (config?.signal) {
            config.signal.addEventListener('abort', () => {
              // safely ignore
            });
          }

          // @ts-ignore
          const result = fetch.apply(that, args);
          result.catch(async error => {
            cb({
              event: {
                type: 'network',
                method: method,
                url,
                requestBody,
                error,
              },
              timestamp: Date.now(),
            });
          });
          // @ts-ignore
          result.then(async response => {
            try {
              const clone = await response?.clone();
              const reader = clone?.body?.getReader();

              let utf8Decoder = new window.TextDecoder('utf-8');
              let bodyContents = '';
              const body = await reader
                ?.read()
                // @ts-ignore
                .then(function readResponseBody(status) {
                  let done = status.done;
                  let value = status.value;

                  if (done) {
                    return bodyContents;
                  }

                  let chunk = value
                    ? utf8Decoder.decode(value, {
                        stream: true,
                      })
                    : '';
                  bodyContents += chunk;
                  return reader?.read().then(readResponseBody);
                });
              const headers = {};

              for (let header of clone.headers?.entries()) {
                // @ts-ignore
                headers[header?.[0]] = header?.[1];
              }

              cb({
                event: {
                  type: 'network',
                  method: method,
                  url,
                  requestBody,
                  response: body,
                  status: clone.status,
                  headers,
                },
                timestamp: Date.now(),
              });
            } catch (error) {
              // safely ignore
            }
          });

          return result;
        },
      });
    }

    return () => null;
  },
  options: {},
};

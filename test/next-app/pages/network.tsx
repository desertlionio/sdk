import type { NextPage } from 'next';
import axios from 'axios';
import { useState } from 'react';
const TriggerAxios: NextPage = () => {
  const [ip, setIp] = useState();
  const [info, setInfo] = useState();

  const triggerGetRequestXhr = async () => {
    const request = await axios('https://ipinfo.io/ip');
    setIp(request.data);
  };

  const triggerPostRequestXhr = async () => {
    const request = await axios('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      data: {
        test: true,
        helloWorld: {
          hello: 'world',
        },
      },
    });
    setInfo(request.data);
  };

  const triggerPostRequestFetch = async () => {
    const request = await fetch('https://api.desertlion.io/', {
      method: 'GET',
      // body: JSON.stringify({
      //   test: true,
      //   helloWorld: {
      //     hello: 'world',
      //   },
      // }),
      headers: {
        Auth: 'zero',
      },
    });
    const info = await request.json();
    setInfo(info);
  };

  return (
    <div>
      <div>
        <button onClick={triggerGetRequestXhr}>
          Trigger GET Request (XHR)
        </button>
        <div>Response {JSON.stringify(ip)}</div>
      </div>
      <div>
        <button onClick={triggerPostRequestXhr}>
          Trigger POST Request (XHR)
        </button>
        <div>Response {JSON.stringify(info)}</div>
      </div>
      <div>
        <button onClick={triggerPostRequestFetch}>
          Trigger POST Request (Fetch)
        </button>
        <div>Response {JSON.stringify(info)}</div>
      </div>
    </div>
  );
};

export default TriggerAxios;

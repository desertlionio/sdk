export default function ErrorPage() {
  if (typeof window !== 'undefined') {
    throw new Error('Should catch this error');
  }
}

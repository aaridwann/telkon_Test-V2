const Fetcher = (...args) => fetch(...args).then(data => data.json())
export default Fetcher
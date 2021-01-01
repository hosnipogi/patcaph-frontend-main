import { useEffect, useMemo, useState } from "react"
import Api from "../services/api"

const useAxios = url => {
  const [data, setData] = useState(null)
  const api = useMemo(() => new Api({ url, method: "get" }), [])

  useEffect(() => {
    api.fetch().then(setData).catch(console.log)
    return () => api.abort()
  }, [url, api])

  return data
}

export default useAxios

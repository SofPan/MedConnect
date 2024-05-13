import { useReducer, useState } from "react"

export const useLoading = () => {

  const [loading, setLoading] = useState(false);

  const isLoading = (loadingState) => setLoading(loadingState)

  return { loading, isLoading };
}
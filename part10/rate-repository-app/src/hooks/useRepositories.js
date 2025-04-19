import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  console.log(data);

  useEffect(() => {
    if (data && data.repositories) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, error };
};

export default useRepositories;

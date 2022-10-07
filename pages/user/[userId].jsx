import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import BASE_URL from "../../src/Constant/BASE_URL";
import Fetcher from "../../src/utils/Fetcher";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

function UserDetails() {
  const route = useRouter();
  const { userId } = route.query;
  const { data, error } = useSWR(BASE_URL + "/" + userId, Fetcher);
  const [repo, setRepo] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchRepo(url) {
    try {
      const res = await axios.get(url);
      return setRepo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data) {
      fetchRepo(data.repos_url);
    }
  }, [data]);
  console.log(repo);

  if (error)
    return (
      <div className=" w-full min-h-screen flex items-center justify-center">
        <p>Something error please try again later</p>
      </div>
    );
  if (!data)
    return (
      <div className=" w-full min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className=" p-2 w-full mx-auto items-center justify-center flex flex-col border-opacity-50">
      <div className="grid w-1/2 h-auto py-4 card bg-base-300 rounded-box place-items-center">
        <div className="avatar">
          <div className="w-24 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              className=" h-full flex items-center justify-center "
              layout='fixed'
              width={100}
              height={100}
              src={data?.avatar_url}
            />
          </div>
        </div>
      </div>
      <div className="divider">{data?.login.toUpperCase()}</div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search Repo"
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <div className="  grid w-full grid-rows-1 md:grid-cols-2 gap-4  h-auto md:w-4/5 py-10 card bg-base-300 rounded-box place-items-center">
        {repo &&
          repo
            .filter((x) => {
              const reg = new RegExp(search);
              return reg.exec(x.name);
            })
            .map((data, i) => (
              <div key={i}>
                <CardRepo
                  fork={data.forks_count}
                  name={data.name}
                  description={data.description}
                  click={data.html_url}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default UserDetails;

function CardRepo({ name, description, fork, click }) {
  return (
    <div className="card w-80 md:w-96 h-52 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end  flex gap-3 items-center ">
          <p>Fork {fork}</p>
          <p>Fork</p>
          <button className="btn">
            <Link target={"_blank"} href={`${click}`}>
              See Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

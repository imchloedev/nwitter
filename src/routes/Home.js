import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  console.log(userObj);

  const getNweets = async () => {
    const dbNweets = await getDocs(query(collection(dbService, "nweets")));
    dbNweets.forEach((document) => {
      const newObj = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [newObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
    const query = query(collection(dbService,"nweets"), orderBy('createdAt', "desc"));
    onSnapshot(query, (snapshot) => {
      
    })
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, 
    });
    setNweet("");
  };

  const onChange = (e) => {
    setNweet(e.target.value);
  };

  // console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((element) => (
          <div key={element.id}>
            <h4>{element.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

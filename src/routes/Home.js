import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { useEffect } from "react";
import { useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbase";
import NweetFactory from "../components/NweetFactory";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);
  //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
  //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    // realtime updated
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((element) => (
          <Nweet
            key={element.id}
            nweetObj={element}
            isOwner={element.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

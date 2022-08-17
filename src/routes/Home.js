import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbase";
import { uuidv4 } from "@firebase/util";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
  //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함
  const [attachment, setAttachment] = useState("");

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

  const onSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = "";

    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 fileUrl=""이 된다.
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(fileRef, attachment, "data_url");
      fileUrl = await getDownloadURL(ref(storageService, fileRef));
    }

    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl,
    });

    //state 비워서 form 비우기
    setNweet("");
    //파일 미리보기 img src 비워주기
    setAttachment("");
  };

  const onChange = (e) => {
    setNweet(e.target.value);
  };

  const onFileChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClear = () => {
    setAttachment("");
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClear}>Clear image</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((element) => (
          <Nweet
            key={element.id}
            nweetObj={element}
            isOwner={element.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTokenFromCookie } from "../../auth/cookie";
import { serverUrl } from "../../common/common";

function MyTodayComment() {
  // 업로드 state / onchange ---------------------------------------------------
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadContent, setUploadContent] = useState("");
  const [uploadImage, setUploadImage] = useState(null);

  const uploadTitleHandler = (e) => {
    setUploadTitle(e.target.value);
  };
  const uploadContentHandler = (e) => {
    setUploadContent(e.target.value);
  };
  const uploadImageHandler = (e) => {
    const image = e.target.files[0]; // 선택된 파일 가져오기
    console.log(`선택된 파일 이름: ${image.name}`);
    console.log(`선택된 파일 크기: ${image.size} bytes`);

    setUploadImage(image);
    // console.log('파일정보', image)
  };

  // 사진변경 onchange ---------------------------------------------------
  const onchangePutImageHandler = (e) => {
    const image = e.target.files[0]; // 선택된 파일 가져오기
    console.log(`선택된 파일 이름: ${image.name}`);
    console.log(`선택된 파일 크기: ${image.size} bytes`);
    setUploadImage(image);
  };
  // console.log("uploadImage", uploadImage);

  // 토큰가져오기 ---------------------------------------------------------------------------
  const token = getTokenFromCookie();

  // 오늘의 한마디 가져오기 ---------------------------------------------------------------
  useEffect(() => {
    getTodayComment();
  }, []);

  // get으로 가져온 한마디 데이터 state에 저장 --------------------------------------
  const [commentData, setCommentdata] = useState([]);
  console.log("commentData", commentData);

  // GET - 나의 오늘의 한마디 가져오기 ------------------------------------
  const getTodayComment = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/opinions`, {
        headers: { Authorization: `Bearer ${token}` }, // 로그인 여부 확인(토큰을 헤더에 추가)
      });
      console.log("오늘의 한마디 가져오기", response.data.data);
      setCommentdata(response.data.data); // 가져온 데이터 set에 저장
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // POST - 오늘의 한마디 업로드 저장버튼 ---------------------------------------------
  const todayCommentSaveHandler = async (e) => {
    e.preventDefault(); // 리프레시 막아주기

    try {
      // if (!token) {
      //   // 토큰이 없는 경우 처리
      //   alert('로그인이 필요합니다.');
      //   // 뒤로가기
      //   navigate(-1)
      //   return;
      // }

      // 사진 업로드는 폼데이터로!!!!!!!!!
      const formData = new FormData();
      formData.append("title", uploadTitle);
      formData.append("content", uploadContent);
      formData.append("image", uploadImage);

      // 서버로 제목, 내용 보냄
      const response = await axios.post(`${serverUrl}/api/opinion`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 로그인 여부 확인(토큰을 헤더에 추가)
          "Content-Type": "multipart/form-data", // 필수: FormData를 보낼 때 content type 설정
        },
      });
      console.log("오늘의 한마디 업로드", response);

      alert("업로드 완료");
      setUploadTitle("");
      setUploadContent("");
      setUploadImage(null); // 이미지 초기화
      getTodayComment();
      console.log("uploadImage", uploadImage);
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // DELETE - 기존 활동모음 삭제 --------------------------------------------------------------
  const onclickDeleteBtnHandler = async (opinionId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/opinion/${opinionId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // 로그인 여부 확인(토큰을 헤더에 추가)
        }
      );
      console.log(response.data.data.msg);
      getTodayComment();
      alert(response.data.data.msg);
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // PUT - 기존 오늘의 한마디 수정 --------------------------------------------------------------
  const onClickPutComment = async (opinionId, newtitle, newContent) => {
    try {
      // 사진 업로드는 폼데이터로!!!!!!!!!
      const updateFormData = new FormData();
      updateFormData.append("title", newtitle);
      updateFormData.append("content", newContent);
      updateFormData.append("image", uploadImage);

      // 서버로 폼데이터 보냄
      const response = await axios.put(
        `${serverUrl}/api/opinion/${opinionId}`,
        updateFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 로그인 여부 확인(토큰을 헤더에 추가)
            "Content-Type": "multipart/form-data", // 필수: FormData를 보낼 때 content type 설정
          },
        }
      );
      alert("수정되었습니다.");
      getTodayComment();
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  return (
    <div className=" h-full w-[1000px]">
      <p className="mt-[50px] ml-7 text-2xl font-black ">
        오늘의 한마디 업로드
      </p>
      <form onSubmit={todayCommentSaveHandler}>
        <div className="bg-[#F9F5EB] my-6 mx-7 p-7 rounded-md shadow-lg">
          <div className="flex flex-row pb-4">
            <p className="text-lg font-bold">제목</p>
            <input
              value={uploadTitle}
              onChange={uploadTitleHandler}
              type="text"
              className="rounded-md mx-3 flex-grow h-8 px-2"
            />
            <p className="text-lg font-bold">사진첨부</p>
            {/* 이미지 업로드 */}
            <input
              type="file"
              accept="image/*"
              onChange={uploadImageHandler}
              className="rounded-md mx-3 flex-grow h-8 px-2"
            />
          </div>
          <div className="flex flex-row pb-4">
            <p className="text-lg font-bold">내용</p>
            <input
              value={uploadContent}
              onChange={uploadContentHandler}
              type="text"
              className="rounded-md mx-3 flex-grow h-20 p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mr-3 flex items-center w-[100px] h-[30px] justify-center rounded-md bg-[#65451F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#564024] "
            >
              저장
            </button>
          </div>
        </div>
      </form>

      <p className="mt-[50px] ml-7 text-2xl font-black">오늘의 한마디 목록</p>

      {/* 맵으로 돌려서 뽑기!!! */}
      {commentData &&
        commentData.map((item, index) => (
          <div
            key={item.opinionId}
            className="bg-[#F9F5EB] my-6 mx-7 p-7 rounded-md shadow-lg"
          >
            <div className="flex flex-row pb-4">
              <p className="text-lg font-bold">제목</p>
              <input
                value={item.opinionTitle}
                onChange={(e) => {
                  const updatedCommentData = [...commentData];
                  updatedCommentData[index].opinionTitle = e.target.value;
                  setCommentdata(updatedCommentData);
                }}
                type="text"
                className="rounded-md mx-3 flex-grow h-8 px-2"
              />
              <p className="text-lg font-bold">사진변경</p>
              <input
                type="file"
                accept="image/*"
                onChange={onchangePutImageHandler}
                className="rounded-md mx-3 flex-grow h-8 px-2"
              />
            </div>
            <div className="flex flex-row pb-4">
              <p className="text-lg font-bold">내용</p>
              <input
                value={item.opinionContent}
                onChange={(e) => {
                  const updatedCommentData = [...commentData];
                  updatedCommentData[index].opinionContent = e.target.value;
                  setCommentdata(updatedCommentData);
                }}
                type="text"
                className="rounded-md mx-3 flex-grow h-20 p-2"
              />
            </div>
            <div className="flex flex-col pb-4">
              <p className="text-lg font-bold pb-4">업로드된 사진</p>
              {item.opinionImageUrl && (
                <img
                  src={item.opinionImageUrl}
                  alt="Uploaded Thumbnail"
                  className="rounded-md mx-3 flex-grow h-[500px] px-2"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onclickDeleteBtnHandler(item.opinionId)}
                className="mr-3 flex items-center w-[100px] h-[30px] justify-center rounded-md bg-[#65451F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#564024]"
              >
                삭제
              </button>
              <button
                type="button"
                className="mr-3 flex items-center w-[100px] h-[30px] justify-center rounded-md bg-[#65451F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#564024] "
                onClick={() =>
                  onClickPutComment(
                    item.opinionId,
                    item.opinionTitle,
                    item.opinionContent
                  )
                }
              >
                수정
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyTodayComment;

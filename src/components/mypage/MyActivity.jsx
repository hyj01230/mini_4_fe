import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenFromCookie } from "../../auth/cookie";
import { serverUrl } from "../../common/common";

function MyActivity() {
  // 페이지 이동 -------------------------------------------------------------------------
  const navigate = useNavigate();

  const { id } = useParams();

  // 업로드 제목/내용/URL/이미지 state ---------------------------------------------------
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadContent, setUploadContent] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [activityData, setActivityData] = useState([]);
  // 업로드 제목/내용/URL/이미지 onchange ---------------------------------------------------
  const uploadTitleHandler = (e) => {
    setUploadTitle(e.target.value);
  };
  const uploadContentHandler = (e) => {
    setUploadContent(e.target.value);
  };
  const uploadUrlHandler = (e) => {
    setUploadUrl(e.target.value);
  };
  const uploadImageHandler = (e) => {
    const image = e.target.files[0]; // 선택된 파일 가져오기
    console.log(`선택된 파일 이름: ${image.name}`);
    console.log(`선택된 파일 크기: ${image.size} bytes`);

    setUploadImage(image);
  };
  const [putTitle, setPutTitle] = useState("");
  const [putContent, setPutContent] = useState("");
  const [putUrl, setPutUrl] = useState("");
  const [putImage, setPutImage] = useState(null);

  const onchangePutTitleHandler = (e) => {
    setPutTitle(e.target.value);
  };
  const onchangePutUrlHandler = (e) => {
    setPutUrl(e.target.value);
  };
  const onchangePutContentHandler = (e) => {
    setPutContent(e.target.value);
  };
  const onchangePutImageHandler = (e) => {
    const image = e.target.files[0]; // 선택된 파일 가져오기
    console.log(`선택된 파일 이름: ${image.name}`);
    console.log(`선택된 파일 크기: ${image.size} bytes`);

    setPutImage(image);
  };

  // 토큰가져오기 ---------------------------------------------------------------------------
  const token = getTokenFromCookie();

  // 활동모음 데이터 가져오기 ---------------------------------------------------------------
  useEffect(() => {
    getActivity();
  }, []);

  // get으로 가져온 활동모음 데이터 state에 저장하기 -------------------------------------------------------
  // 데이터'들' 들어올거니까 []
  // GET - 활동모음 가져오기 -----------------------------------------------------------------
  const getActivity = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/campaigns`, {
        headers: { Authorization: `Bearer ${token}` }, // 로그인 여부 확인(토큰을 헤더에 추가)
      });

      setActivityData(response.data.data); // 가져온 활동모음 데이터 state에 저장하기!
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // POST - 활동모음 업로드 저장버튼 ---------------------------------------------------------
  const activitySaveHandler = async (e) => {
    e.preventDefault(); // 리프레시 막아주기

    try {
      // // 토큰이 없는 경우 처리
      // if (!token) {
      //   alert('로그인이 필요합니다.');
      //   navigate(-1) // 뒤로가기
      //   return;
      // }

      // 사진 업로드는 폼데이터로!!!!!!!!!
      const formData = new FormData();
      formData.append("title", uploadTitle);
      formData.append("content", uploadContent);
      formData.append("url", uploadUrl);
      formData.append("image", uploadImage);

      // 서버로 폼데이터 보냄
      const response = await axios.post(`${serverUrl}/api/campaign`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 로그인 여부 확인(토큰을 헤더에 추가)
          "Content-Type": "multipart/form-data", // 필수: FormData를 보낼 때 content type 설정
        },
      });

      alert("업로드 완료");
      setUploadTitle("");
      setUploadContent("");
      setUploadUrl("");
      setUploadImage(null);
      getActivity();
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // DELETE - 기존 활동모음 삭제 --------------------------------------------------------------
  const onclickDeleteBtnHandler = async (campaignId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/campaign/${campaignId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // 로그인 여부 확인(토큰을 헤더에 추가)
        }
      );
      getActivity();
      alert(response.data.data.msg);
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  // PUT - 기존 활동모음 수정 --------------------------------------------------------------

  // 수정할 제목/내용/URL/이미지 state ---------------------------------------------------

  const onclickPutBtnHandler = async (campaignId) => {
    const putFormData = new FormData();
    const find_data = activityData.find((x) => x.campaignId === campaignId);
    putFormData.append("title", putTitle ? putTitle : find_data.campaignTitle);
    putFormData.append(
      "content",
      putContent ? putContent : find_data.campaignContent
    );
    putFormData.append("url", putUrl ? putUrl : find_data.campaignUrl);
    putFormData.append(
      "image",
      putImage ? putImage : find_data.campaignThumbnail
    );

    try {
      const response = await axios.put(
        `${serverUrl}/api/campaign/${campaignId}`,
        putFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 로그인 여부 확인(토큰을 헤더에 추가)
            "Content-Type": "multipart/form-data", // 필수: FormData를 보낼 때 content type 설정
          },
        }
      );
      getActivity();
    } catch (error) {
      alert(`${error}`);
      console.error(error);
    }
  };

  return (
    <div className=" h-full w-[1000px]">
      <p className="mt-[50px] ml-7 text-2xl font-black ">활동모음 업로드</p>
      <form
        onSubmit={activitySaveHandler}
        className="bg-[#F9F5EB] my-6 mx-7 p-7 rounded-md shadow-lg"
      >
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
          <p className="text-lg font-bold">URL</p>
          <input
            value={uploadUrl}
            onChange={uploadUrlHandler}
            placeholder="url을 입력해주세요"
            type="text"
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
      </form>

      <p className="mt-[50px] ml-7 text-2xl font-black">활동모음 업로드 목록</p>

      {activityData &&
        activityData.map((item) => (
          <div
            key={item.campaignId}
            className="bg-[#F9F5EB] my-6 mx-7 p-7 rounded-md shadow-lg"
          >
            <div className="flex flex-row pb-4">
              <p className="text-lg font-bold">제목</p>
              <input
                defaultValue={item.campaignTitle}
                onChange={onchangePutTitleHandler}
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
              <p className="text-lg font-bold">URL</p>
              <input
                defaultValue={item.campaignUrl}
                onChange={onchangePutUrlHandler}
                type="text"
                className="rounded-md mx-3 flex-grow h-8 px-2"
              />
            </div>
            <div className="flex flex-row pb-4">
              <p className="text-lg font-bold">내용</p>
              <input
                defaultValue={item.campaignContent}
                onChange={onchangePutContentHandler}
                type="text"
                className="rounded-md mx-3 flex-grow h-20 p-2"
              />
            </div>
            <div className="flex flex-col pb-4">
              <p className="text-lg font-bold pb-4">업로드된 사진</p>
              {item.campaignThumbnail && (
                <img
                  src={item.campaignThumbnail}
                  alt="Uploaded Thumbnail"
                  className="rounded-md mx-3 flex-grow h-[300px] px-2"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onclickDeleteBtnHandler(item.campaignId)}
                className="mr-3 flex items-center w-[100px] h-[30px] justify-center rounded-md bg-[#65451F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#564024]"
              >
                삭제
              </button>
              <button
                type="button"
                className="mr-3 flex items-center w-[100px] h-[30px] justify-center rounded-md bg-[#65451F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#564024] "
                onClick={() => {
                  onclickPutBtnHandler(item.campaignId);
                }}
              >
                저장
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyActivity;
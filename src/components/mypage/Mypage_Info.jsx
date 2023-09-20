import { Listbox, Transition } from '@headlessui/react';
import { async } from 'q';
import React, { Fragment, useEffect, useState } from 'react'
import { locations, partys } from '../../data/data';
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// 테일윈드 Select Menus
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// 마이페이지_내 정보
function Mypage_Info() {

  // 회원정보 state/onChange --------------------------------------------------
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [locationList, setLocationList] = useState(locations[0])
  const [partyList, setPartyList] = useState(partys[0])

  const onChangeEmailHandler = (e) => { setEmail(e.target.value) }
  const onChangePhoneNumHandler = (e) => {
    const inputValue = e.target.value;
    // 전화번호 형식 정규식!
    const formattedValue = inputValue.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    setPhoneNum(formattedValue);
  };
  const onChangePartyHandler = (e) => { }


  // PW state/onChange --------------------------------------------------
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const onChangeCurrentPwHandler = (e) => { setCurrentPassword(e.target.value) }
  const onChangeNwePwHandler = (e) => { setNewPassword(e.target.value) }
  const onChangeCheckPwHandler = (e) => { setCheckPassword(e.target.value) }

  // currentPW 유효성검사 및 안내메시지 --------------------------------------------------
  const [pwMessage, setPwMessage] = useState("");

  useEffect(() => {
    if (currentPassword.length === 0) {
      setPwMessage("");
    } else if (currentPassword < 8) {
      setPwMessage("비밀번호는 8글자 이상이어야 합니다.");
    } else if (!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(currentPassword)) {
      setPwMessage("영어 소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
    } else {
      setPwMessage(true);
    }
  }, [currentPassword])

  // newPW 유효성검사 및 안내메시지 --------------------------------------------------
  const [newPwMessage, setNewPwMessage] = useState("");

  useEffect(() => {
    if (newPassword.length === 0) {
      setNewPwMessage("");
    } else if (newPassword < 8) {
      setNewPwMessage("비밀번호는 8글자 이상이어야 합니다.");
    } else if (!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(newPassword)) {
      setNewPwMessage("영어 소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
    } else if (newPassword === currentPassword) {
      setNewPwMessage("기존 비밀번호와 동일합니다.")
    } else {
      setNewPwMessage(true);
    }
  }, [newPassword])

  // checkPW 유효성검사 및 안내메시지 --------------------------------------------------
  const [checkPwMessage, setCheckPwMessage] = useState("");

  useEffect(() => {
    if (checkPassword.length === 0) {
      setCheckPwMessage("");
    } else if (checkPassword !== newPassword) {
      setCheckPwMessage("비밀번호가 일치하지 않습니다.");
    } else if (checkPassword === newPassword) {
      setCheckPwMessage(true);
    }
  }, [checkPassword])

  // 회원정보 취소 > stae 비우기 --------------------------------------------------
  const onClickInfoCancleHandler = () => {
    setPhoneNum("")
    setEmail("")
  }

  // 비밀번호 취소 > stae 비우기 --------------------------------------------------
  const onClickPWCancleHandler = () => {
    setCurrentPassword("")
    setNewPassword("")
    setCheckPassword("")
  }

  // 회원정보 저장 > 서버로 db보내기 --------------------------------------------------
  const onSubmitInfoHandler = async () => {
    try {

    }

    catch {

    }
  }


  // 비밀번호 저장 > 서버로 db보내기 --------------------------------------------------
  const onSubmitPwHandler = async () => {
    try {

    }

    catch {

    }
  }


  return (
    <div className=' h-screen w-[1000px]'>
      <p className='mt-[50px] ml-7 text-2xl font-black'>내 정보</p>


      <div className='border my-6 mx-7 py-7 pl-7 pr-16 flex flex-col'>
        <div className='flex flex-row'>
          <div className='w-[150px] text-xl font-bold flex justify-center'>
            회원정보
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row mb-5'>
              <p className='w-[100px] flex justify-start mx-3'>이름</p>
              <input
                value={'회원 이름 가져와서 고정!'}
                disabled
                className='border flex items-center w-full px-3' />
            </div>
            <div className='flex flex-row mb-5'>
              <p className='w-[100px] flex justify-start mx-3'>이메일</p>
              <input
                value={email}
                onChange={onChangeEmailHandler}
                className='border flex items-center w-full px-3' />
            </div>
            <div className='flex flex-row mb-5'>
              <p className='w-[100px] flex justify-start mx-3'>전화번호</p>
              <input
                value={phoneNum}
                onChange={onChangePhoneNumHandler}
                placeholder='010-1234-5678'
                maxLength={13}
                className='border flex items-center w-full px-3' />
            </div>
            <div className='flex flex-row mb-5'>
              <p className='w-[100px] flex justify-start mx-3'>지역</p>
              <div className='border flex items-center w-full px-3'></div>
            </div>
            <div>
              <Listbox value={locationList} onChange={setLocationList}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">{locationList.party}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {locations.map((item) => (
                            <Listbox.Option
                              key={item.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={item.locationList}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                      {item.locationList}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className='flex flex-row mb-5'>
              <p className='w-[100px] flex justify-start mx-3'>소속정당</p>
              <div className='border flex items-center w-full px-3'></div>

            </div>
          </div>
        </div>
        <form className='flex flex-row justify-end' onSubmit={onSubmitInfoHandler}>
          <button
            type="button"
            onClick={onClickInfoCancleHandler}
            className="flex items-center w-[100px] h-[40px] my-2 mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex items-center w-[100px] h-[40px] my-2 mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </form>
      </div>

      <div className='border my-6 mx-7 py-7 pl-7 pr-16 flex flex-col'>
        <div className='flex flex-row'>
          <div className='w-[150px] text-xl font-bold flex justify-center'>
            비밀번호
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row mb-3'>
              <p className='w-[200px] flex justify-start ml-3'>현재 비밀번호</p>
              <input
                type='password'
                value={currentPassword}
                onChange={onChangeCurrentPwHandler}
                maxLength={20}
                className='border flex items-center w-full px-3' />
            </div>
            <div>
              <p className="ml-[170px] my-2 text-red-600">{pwMessage}</p>
            </div>
            <div className='flex flex-row mb-3'>
              <p className='w-[200px] flex justify-start ml-3'>새 비밀번호</p>
              <input
                type='password'
                value={newPassword}
                onChange={onChangeNwePwHandler}
                maxLength={20}
                className='border flex items-center w-full px-3' />
            </div>
            <div>
              <p className="ml-[170px] my-2 text-red-600">{newPwMessage}</p>
            </div>
            <div className='flex flex-row mb-3'>
              <p className='w-[200px] flex justify-start ml-3'>새 비밀번호 확인</p>
              <input
                type='password'
                value={checkPassword}
                onChange={onChangeCheckPwHandler}
                maxLength={20}
                className='border flex items-center w-full px-3' />
            </div>
            <div>
              <p className="ml-[170px] my-2 text-red-600">{checkPwMessage}</p>
            </div>

          </div>
        </div>
        <form className='flex flex-row justify-end' onSubmit={onSubmitInfoHandler}>
          <button
            type="button"
            onClick={onClickPWCancleHandler}
            className="flex items-center w-[100px] h-[40px] my-2 mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex items-center w-[100px] h-[40px] my-2 mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  )
}

export default Mypage_Info
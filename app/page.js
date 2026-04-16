"use client";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

// ─── Destination data ─────────────────────────────────────────────────────────

const REGION_GROUPS = [
  {
    id: "africa", name: "Africa", color: "#b45309",
    destinations: [
      { id:"benin",       name:"Benin",            repCur:"XOF", avgDailyUSD:55,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1400,MEL:1400,BNE:1420,PER:1380,LHR:520,JFK:900,LAX:980,DXB:600,SIN:1100,NRT:1300} },
      { id:"botswana",    name:"Botswana",          repCur:"BWP", avgDailyUSD:180, fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1200,MEL:1200,BNE:1220,PER:1150,LHR:480,JFK:820,LAX:900,DXB:520,SIN:1050,NRT:1250} },
      { id:"comoros",     name:"Comoros Island",    repCur:"KMF", avgDailyUSD:70,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1080,LHR:600,JFK:1000,LAX:1100,DXB:550,SIN:900,NRT:1200} },
      { id:"egypt",       name:"Egypt",             repCur:"EGP", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1000,MEL:1000,BNE:1020,PER:980,LHR:280,JFK:700,LAX:800,DXB:200,SIN:750,NRT:1000} },
      { id:"eswatini",    name:"Eswatini",          repCur:"SZL", avgDailyUSD:90,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1250,MEL:1250,BNE:1270,PER:1200,LHR:500,JFK:850,LAX:930,DXB:560,SIN:1080,NRT:1280} },
      { id:"ghana",       name:"Ghana",             repCur:"GHS", avgDailyUSD:70,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1350,MEL:1350,BNE:1370,PER:1320,LHR:480,JFK:780,LAX:870,DXB:580,SIN:1100,NRT:1300} },
      { id:"kenya",       name:"Kenya",             repCur:"KES", avgDailyUSD:95,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1050,MEL:1050,BNE:1070,PER:1020,LHR:420,JFK:780,LAX:860,DXB:380,SIN:820,NRT:1100} },
      { id:"lesotho",     name:"Lesotho",           repCur:"LSL", avgDailyUSD:75,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1200,MEL:1200,BNE:1220,PER:1160,LHR:490,JFK:830,LAX:910,DXB:540,SIN:1060,NRT:1260} },
      { id:"madagascar",  name:"Madagascar",        repCur:"MGA", avgDailyUSD:60,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:980,MEL:980,BNE:1000,PER:960,LHR:580,JFK:950,LAX:1030,DXB:520,SIN:800,NRT:1100} },
      { id:"malawi",      name:"Malawi",            repCur:"MWK", avgDailyUSD:65,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1060,LHR:460,JFK:820,LAX:900,DXB:480,SIN:920,NRT:1180} },
      { id:"morocco",     name:"Morocco",           repCur:"MAD", avgDailyUSD:75,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1150,MEL:1150,BNE:1170,PER:1100,LHR:160,JFK:620,LAX:720,DXB:320,SIN:850,NRT:1100} },
      { id:"namibia",     name:"Namibia",           repCur:"NAD", avgDailyUSD:120, fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1200,MEL:1200,BNE:1220,PER:1150,LHR:460,JFK:800,LAX:880,DXB:520,SIN:1020,NRT:1250} },
      { id:"rwanda",      name:"Rwanda",            repCur:"RWF", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1060,LHR:430,JFK:790,LAX:870,DXB:430,SIN:870,NRT:1150} },
      { id:"senegal",     name:"Senegal",           repCur:"XOF", avgDailyUSD:65,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1380,MEL:1380,BNE:1400,PER:1340,LHR:430,JFK:750,LAX:840,DXB:600,SIN:1120,NRT:1320} },
      { id:"sierraleone", name:"Sierra Leone",      repCur:"SLL", avgDailyUSD:60,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1400,MEL:1400,BNE:1420,PER:1360,LHR:450,JFK:780,LAX:860,DXB:610,SIN:1130,NRT:1340} },
      { id:"southafrica", name:"South Africa",      repCur:"ZAR", avgDailyUSD:100, fxTrend:"improving", flightTrend:"falling", flights:{SYD:1100,MEL:1080,BNE:1120,PER:1050,LHR:420,JFK:780,LAX:860,DXB:480,SIN:950,NRT:1200} },
      { id:"tanzania",    name:"Tanzania",          repCur:"TZS", avgDailyUSD:105, fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1080,MEL:1080,BNE:1100,PER:1040,LHR:440,JFK:800,LAX:880,DXB:400,SIN:840,NRT:1120} },
      { id:"gambia",      name:"The Gambia",        repCur:"GMD", avgDailyUSD:55,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1400,MEL:1400,BNE:1420,PER:1360,LHR:440,JFK:760,LAX:850,DXB:600,SIN:1120,NRT:1330} },
      { id:"togo",        name:"Togo",              repCur:"XOF", avgDailyUSD:55,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1390,MEL:1390,BNE:1410,PER:1350,LHR:510,JFK:880,LAX:960,DXB:590,SIN:1110,NRT:1310} },
      { id:"tunisia",     name:"Tunisia",           repCur:"TND", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1100,MEL:1100,BNE:1120,PER:1060,LHR:180,JFK:650,LAX:750,DXB:280,SIN:830,NRT:1060} },
      { id:"uganda",      name:"Uganda",            repCur:"UGX", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1060,LHR:440,JFK:800,LAX:880,DXB:420,SIN:860,NRT:1140} },
      { id:"zambia",      name:"Zambia",            repCur:"ZMW", avgDailyUSD:110, fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1150,MEL:1150,BNE:1170,PER:1100,LHR:460,JFK:810,LAX:890,DXB:490,SIN:970,NRT:1210} },
      { id:"zanzibar",    name:"Zanzibar",          repCur:"TZS", avgDailyUSD:95,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1080,MEL:1080,BNE:1100,PER:1040,LHR:450,JFK:810,LAX:890,DXB:410,SIN:840,NRT:1120} },
      { id:"zimbabwe",    name:"Zimbabwe",          repCur:"ZWL", avgDailyUSD:90,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1180,MEL:1180,BNE:1200,PER:1140,LHR:470,JFK:820,LAX:900,DXB:500,SIN:1000,NRT:1230} },
    ]
  },
  {
    id: "asia", name: "Asia", color: "#0369a1",
    destinations: [
      { id:"armenia",      name:"Armenia",          repCur:"AMD", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1200,MEL:1200,BNE:1220,PER:1160,LHR:280,JFK:750,LAX:850,DXB:280,SIN:850,NRT:1050} },
      { id:"azerbaijan",   name:"Azerbaijan",       repCur:"AZN", avgDailyUSD:75,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1180,MEL:1180,BNE:1200,PER:1140,LHR:290,JFK:760,LAX:860,DXB:270,SIN:860,NRT:1060} },
      { id:"bali",         name:"Bali",             repCur:"IDR", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:380,MEL:390,BNE:400,PER:430,LHR:820,JFK:1050,LAX:950,DXB:620,SIN:120,NRT:350} },
      { id:"bhutan",       name:"Bhutan",           repCur:"BTN", avgDailyUSD:250, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:900,MEL:900,BNE:920,PER:960,LHR:680,JFK:980,LAX:1060,DXB:550,SIN:400,NRT:700} },
      { id:"borneo",       name:"Borneo",           repCur:"MYR", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:500,MEL:510,BNE:520,PER:480,LHR:820,JFK:1020,LAX:920,DXB:650,SIN:160,NRT:420} },
      { id:"cambodia",     name:"Cambodia",         repCur:"KHR", avgDailyUSD:45,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:520,MEL:530,BNE:540,PER:570,LHR:780,JFK:980,LAX:880,DXB:600,SIN:180,NRT:380} },
      { id:"china",        name:"China",            repCur:"CNY", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:620,MEL:630,BNE:640,PER:680,LHR:680,JFK:820,LAX:720,DXB:580,SIN:280,NRT:200} },
      { id:"georgia",      name:"Georgia",          repCur:"GEL", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1200,MEL:1200,BNE:1220,PER:1160,LHR:260,JFK:740,LAX:840,DXB:260,SIN:850,NRT:1040} },
      { id:"hongkong",     name:"Hong Kong",        repCur:"HKD", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:580,MEL:590,BNE:600,PER:640,LHR:680,JFK:820,LAX:720,DXB:560,SIN:230,NRT:250} },
      { id:"india",        name:"India",            repCur:"INR", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:780,MEL:780,BNE:800,PER:720,LHR:420,JFK:780,LAX:860,DXB:220,SIN:320,NRT:680} },
      { id:"indonesia",    name:"Indonesia",        repCur:"IDR", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:400,MEL:410,BNE:420,PER:450,LHR:830,JFK:1060,LAX:960,DXB:630,SIN:130,NRT:360} },
      { id:"japan",        name:"Japan",            repCur:"JPY", avgDailyUSD:110, fxTrend:"improving", flightTrend:"stable",  flights:{SYD:700,MEL:700,BNE:720,PER:780,LHR:820,JFK:780,LAX:680,DXB:780,SIN:380,NRT:0} },
      { id:"kazakhstan",   name:"Kazakhstan",       repCur:"KZT", avgDailyUSD:60,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1140,LHR:380,JFK:820,LAX:900,DXB:360,SIN:680,NRT:820} },
      { id:"kyrgyzstan",   name:"Kyrgyzstan",       repCur:"KGS", avgDailyUSD:45,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1050,MEL:1050,BNE:1070,PER:1100,LHR:400,JFK:840,LAX:920,DXB:380,SIN:660,NRT:800} },
      { id:"laos",         name:"Laos",             repCur:"LAK", avgDailyUSD:40,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:550,MEL:560,BNE:570,PER:600,LHR:800,JFK:1000,LAX:900,DXB:620,SIN:200,NRT:400} },
      { id:"malaysia",     name:"Malaysia",         repCur:"MYR", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:480,MEL:490,BNE:500,PER:460,LHR:780,JFK:980,LAX:880,DXB:600,SIN:60,NRT:380} },
      { id:"maldives",     name:"Maldives",         repCur:"MVR", avgDailyUSD:350, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:780,MEL:780,BNE:800,PER:820,LHR:520,JFK:880,LAX:960,DXB:320,SIN:380,NRT:720} },
      { id:"mongolia",     name:"Mongolia",         repCur:"MNT", avgDailyUSD:65,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:820,MEL:820,BNE:840,PER:880,LHR:720,JFK:900,LAX:800,DXB:700,SIN:500,NRT:300} },
      { id:"nepal",        name:"Nepal",            repCur:"NPR", avgDailyUSD:50,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:820,MEL:820,BNE:840,PER:860,LHR:480,JFK:840,LAX:920,DXB:300,SIN:360,NRT:720} },
      { id:"pakistan",     name:"Pakistan",         repCur:"PKR", avgDailyUSD:40,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:820,MEL:820,BNE:840,PER:800,LHR:380,JFK:820,LAX:900,DXB:220,SIN:380,NRT:720} },
      { id:"philippines",  name:"Philippines",      repCur:"PHP", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:520,MEL:530,BNE:540,PER:580,LHR:820,JFK:980,LAX:880,DXB:660,SIN:200,NRT:320} },
      { id:"singapore",    name:"Singapore",        repCur:"SGD", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:380,MEL:390,BNE:400,PER:420,LHR:720,JFK:920,LAX:820,DXB:500,SIN:0,NRT:360} },
      { id:"southkorea",   name:"South Korea",      repCur:"KRW", avgDailyUSD:95,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:650,MEL:650,BNE:670,PER:720,LHR:800,JFK:780,LAX:680,DXB:760,SIN:360,NRT:120} },
      { id:"srilanka",     name:"Sri Lanka",        repCur:"LKR", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:750,MEL:750,BNE:770,PER:780,LHR:500,JFK:860,LAX:940,DXB:280,SIN:300,NRT:700} },
      { id:"taiwan",       name:"Taiwan",           repCur:"TWD", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:600,MEL:600,BNE:620,PER:660,LHR:780,JFK:820,LAX:720,DXB:720,SIN:270,NRT:180} },
      { id:"tajikistan",   name:"Tajikistan",       repCur:"TJS", avgDailyUSD:40,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1080,MEL:1080,BNE:1100,PER:1120,LHR:420,JFK:860,LAX:940,DXB:400,SIN:680,NRT:820} },
      { id:"thailand",     name:"Thailand",         repCur:"THB", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:430,MEL:440,BNE:455,PER:490,LHR:720,JFK:920,LAX:820,DXB:510,SIN:85,NRT:310} },
      { id:"tibet",        name:"Tibet",            repCur:"CNY", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:750,MEL:750,BNE:770,PER:800,LHR:760,JFK:900,LAX:800,DXB:650,SIN:380,NRT:280} },
      { id:"timorleste",   name:"Timor-Leste",      repCur:"USD", avgDailyUSD:65,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:480,MEL:490,BNE:500,PER:540,LHR:980,JFK:1150,LAX:1050,DXB:820,SIN:340,NRT:480} },
      { id:"turkmenistan", name:"Turkmenistan",     repCur:"TMT", avgDailyUSD:50,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1100,MEL:1100,BNE:1120,PER:1140,LHR:400,JFK:860,LAX:940,DXB:340,SIN:700,NRT:850} },
      { id:"uzbekistan",   name:"Uzbekistan",       repCur:"UZS", avgDailyUSD:45,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1050,MEL:1050,BNE:1070,PER:1100,LHR:380,JFK:840,LAX:920,DXB:320,SIN:660,NRT:800} },
      { id:"vietnam",      name:"Vietnam",          repCur:"VND", avgDailyUSD:48,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:480,MEL:490,BNE:500,PER:540,LHR:760,JFK:960,LAX:860,DXB:580,SIN:140,NRT:340} },
    ]
  },
  {
    id: "pacific", name: "Pacific & Oceania", color: "#0f766e",
    destinations: [
      { id:"australia",  name:"Australia",         repCur:"AUD", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:0,MEL:0,BNE:0,PER:0,LHR:920,JFK:1050,LAX:900,DXB:900,SIN:380,NRT:680} },
      { id:"fiji",       name:"Fiji",              repCur:"FJD", avgDailyUSD:120, fxTrend:"improving", flightTrend:"stable", flights:{SYD:420,MEL:430,BNE:400,PER:580,LHR:1100,JFK:1000,LAX:850,DXB:1050,SIN:680,NRT:780} },
      { id:"newzealand", name:"New Zealand",       repCur:"NZD", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:240,MEL:250,BNE:260,PER:400,LHR:1000,JFK:1050,LAX:880,DXB:980,SIN:700,NRT:820} },
      { id:"png",        name:"Papua New Guinea",  repCur:"PGK", avgDailyUSD:100, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:380,MEL:420,BNE:340,PER:560,LHR:1080,JFK:1150,LAX:980,DXB:1050,SIN:480,NRT:620} },
      { id:"samoa",      name:"Samoa",             repCur:"WST", avgDailyUSD:100, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:480,MEL:520,BNE:460,PER:680,LHR:1150,JFK:1080,LAX:900,DXB:1100,SIN:780,NRT:880} },
      { id:"vanuatu",    name:"Vanuatu",           repCur:"VUV", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:360,MEL:400,BNE:340,PER:560,LHR:1120,JFK:1150,LAX:980,DXB:1080,SIN:720,NRT:820} },
    ]
  },
  {
    id: "central_america", name: "Central America & Caribbean", color: "#7c3aed",
    destinations: [
      { id:"belize",    name:"Belize",      repCur:"BZD", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1500,MEL:1520,BNE:1480,PER:1600,LHR:600,JFK:220,LAX:200,DXB:920,SIN:1150,NRT:1050} },
      { id:"caribbean", name:"Caribbean",   repCur:"USD", avgDailyUSD:150, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:550,JFK:180,LAX:250,DXB:950,SIN:1200,NRT:1100} },
      { id:"costarica", name:"Costa Rica",  repCur:"CRC", avgDailyUSD:90,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1520,MEL:1540,BNE:1500,PER:1620,LHR:590,JFK:200,LAX:180,DXB:930,SIN:1160,NRT:1060} },
      { id:"cuba",      name:"Cuba",        repCur:"CUP", avgDailyUSD:70,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:580,JFK:200,LAX:280,DXB:960,SIN:1200,NRT:1100} },
      { id:"elsalvador",name:"El Salvador", repCur:"USD", avgDailyUSD:60,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1550,MEL:1570,BNE:1530,PER:1650,LHR:610,JFK:210,LAX:160,DXB:940,SIN:1170,NRT:1070} },
      { id:"guatemala", name:"Guatemala",   repCur:"GTQ", avgDailyUSD:65,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1540,MEL:1560,BNE:1520,PER:1640,LHR:600,JFK:200,LAX:170,DXB:930,SIN:1160,NRT:1060} },
      { id:"honduras",  name:"Honduras",    repCur:"HNL", avgDailyUSD:60,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1560,MEL:1580,BNE:1540,PER:1660,LHR:610,JFK:210,LAX:180,DXB:940,SIN:1170,NRT:1070} },
      { id:"mexico",    name:"Mexico",      repCur:"MXN", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1450,MEL:1470,BNE:1430,PER:1550,LHR:570,JFK:180,LAX:100,DXB:900,SIN:1130,NRT:1030} },
      { id:"nicaragua", name:"Nicaragua",   repCur:"NIO", avgDailyUSD:50,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1560,MEL:1580,BNE:1540,PER:1660,LHR:610,JFK:210,LAX:190,DXB:940,SIN:1170,NRT:1070} },
      { id:"panama",    name:"Panama",      repCur:"USD", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1530,MEL:1550,BNE:1510,PER:1630,LHR:590,JFK:200,LAX:180,DXB:930,SIN:1160,NRT:1060} },
    ]
  },
  {
    id: "europe", name: "Europe", color: "#b91c1c",
    destinations: [
      { id:"albania",       name:"Albania",         repCur:"ALL", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1300,MEL:1300,BNE:1320,PER:1260,LHR:120,JFK:540,LAX:640,DXB:380,SIN:820,NRT:1000} },
      { id:"andorra",       name:"Andorra",         repCur:"EUR", avgDailyUSD:100, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1320,MEL:1300,BNE:1340,PER:1280,LHR:110,JFK:530,LAX:630,DXB:400,SIN:820,NRT:1000} },
      { id:"austria",       name:"Austria",         repCur:"EUR", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:90,JFK:510,LAX:610,DXB:380,SIN:800,NRT:980} },
      { id:"belgium",       name:"Belgium",         repCur:"EUR", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1320,MEL:1300,BNE:1340,PER:1270,LHR:80,JFK:510,LAX:620,DXB:400,SIN:810,NRT:990} },
      { id:"bosnia",        name:"Bosnia",          repCur:"BAM", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:110,JFK:530,LAX:640,DXB:380,SIN:810,NRT:990} },
      { id:"bulgaria",      name:"Bulgaria",        repCur:"BGN", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1280,MEL:1260,BNE:1300,PER:1230,LHR:100,JFK:520,LAX:630,DXB:370,SIN:800,NRT:980} },
      { id:"croatia",       name:"Croatia",         repCur:"EUR", avgDailyUSD:85,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:110,JFK:530,LAX:640,DXB:380,SIN:810,NRT:990} },
      { id:"czech",         name:"Czech Republic",  repCur:"CZK", avgDailyUSD:75,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:90,JFK:510,LAX:620,DXB:380,SIN:800,NRT:980} },
      { id:"denmark",       name:"Denmark",         repCur:"DKK", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1330,MEL:1310,BNE:1350,PER:1280,LHR:80,JFK:510,LAX:630,DXB:410,SIN:820,NRT:1000} },
      { id:"estonia",       name:"Estonia",         repCur:"EUR", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1340,MEL:1320,BNE:1360,PER:1290,LHR:90,JFK:520,LAX:640,DXB:420,SIN:830,NRT:1010} },
      { id:"faroeislands",  name:"Faroe Islands",   repCur:"DKK", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1400,MEL:1380,BNE:1420,PER:1350,LHR:120,JFK:560,LAX:680,DXB:460,SIN:870,NRT:1050} },
      { id:"finland",       name:"Finland",         repCur:"EUR", avgDailyUSD:120, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1340,MEL:1320,BNE:1360,PER:1290,LHR:85,JFK:520,LAX:640,DXB:420,SIN:830,NRT:1010} },
      { id:"france",        name:"France",          repCur:"EUR", avgDailyUSD:115, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:70,JFK:500,LAX:610,DXB:390,SIN:800,NRT:980} },
      { id:"germany",       name:"Germany",         repCur:"EUR", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:80,JFK:500,LAX:610,DXB:380,SIN:800,NRT:980} },
      { id:"greece",        name:"Greece",          repCur:"EUR", avgDailyUSD:90,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1290,MEL:1270,BNE:1310,PER:1240,LHR:100,JFK:520,LAX:630,DXB:360,SIN:800,NRT:980} },
      { id:"greenland",     name:"Greenland",       repCur:"DKK", avgDailyUSD:180, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1500,MEL:1500,BNE:1520,PER:1480,LHR:280,JFK:380,LAX:520,DXB:620,SIN:1050,NRT:1100} },
      { id:"hungary",       name:"Hungary",         repCur:"HUF", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1290,MEL:1270,BNE:1310,PER:1240,LHR:90,JFK:510,LAX:620,DXB:370,SIN:800,NRT:980} },
      { id:"iceland",       name:"Iceland",         repCur:"ISK", avgDailyUSD:170, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1420,MEL:1400,BNE:1440,PER:1370,LHR:120,JFK:380,LAX:520,DXB:480,SIN:880,NRT:1060} },
      { id:"ireland",       name:"Ireland",         repCur:"EUR", avgDailyUSD:120, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:60,JFK:480,LAX:600,DXB:400,SIN:810,NRT:990} },
      { id:"italy",         name:"Italy",           repCur:"EUR", avgDailyUSD:110, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:90,JFK:510,LAX:620,DXB:370,SIN:800,NRT:980} },
      { id:"kosovo",        name:"Kosovo",          repCur:"EUR", avgDailyUSD:50,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:110,JFK:530,LAX:640,DXB:380,SIN:810,NRT:990} },
      { id:"latvia",        name:"Latvia",          repCur:"EUR", avgDailyUSD:75,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1330,MEL:1310,BNE:1350,PER:1280,LHR:90,JFK:520,LAX:640,DXB:410,SIN:820,NRT:1000} },
      { id:"lithuania",     name:"Lithuania",       repCur:"EUR", avgDailyUSD:75,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1330,MEL:1310,BNE:1350,PER:1280,LHR:90,JFK:520,LAX:640,DXB:410,SIN:820,NRT:1000} },
      { id:"malta",         name:"Malta",           repCur:"EUR", avgDailyUSD:90,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:110,JFK:540,LAX:650,DXB:360,SIN:800,NRT:980} },
      { id:"montenegro",    name:"Montenegro",      repCur:"EUR", avgDailyUSD:70,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:110,JFK:530,LAX:640,DXB:370,SIN:800,NRT:980} },
      { id:"netherlands",   name:"Netherlands",     repCur:"EUR", avgDailyUSD:115, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:70,JFK:500,LAX:610,DXB:390,SIN:800,NRT:980} },
      { id:"northmacedonia",name:"North Macedonia", repCur:"MKD", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1290,MEL:1270,BNE:1310,PER:1240,LHR:110,JFK:530,LAX:640,DXB:370,SIN:800,NRT:980} },
      { id:"norway",        name:"Norway",          repCur:"NOK", avgDailyUSD:150, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1340,MEL:1320,BNE:1360,PER:1290,LHR:80,JFK:510,LAX:640,DXB:420,SIN:830,NRT:1010} },
      { id:"poland",        name:"Poland",          repCur:"PLN", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:85,JFK:510,LAX:620,DXB:390,SIN:800,NRT:980} },
      { id:"portugal",      name:"Portugal",        repCur:"EUR", avgDailyUSD:85,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:80,JFK:500,LAX:610,DXB:390,SIN:800,NRT:990} },
      { id:"romania",       name:"Romania",         repCur:"RON", avgDailyUSD:60,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1290,MEL:1270,BNE:1310,PER:1240,LHR:100,JFK:520,LAX:630,DXB:370,SIN:800,NRT:980} },
      { id:"scotland",      name:"Scotland",        repCur:"GBP", avgDailyUSD:115, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:50,JFK:490,LAX:610,DXB:400,SIN:810,NRT:990} },
      { id:"serbia",        name:"Serbia",          repCur:"RSD", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1290,MEL:1270,BNE:1310,PER:1240,LHR:100,JFK:520,LAX:630,DXB:370,SIN:800,NRT:980} },
      { id:"slovakia",      name:"Slovakia",        repCur:"EUR", avgDailyUSD:70,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:90,JFK:510,LAX:620,DXB:380,SIN:800,NRT:980} },
      { id:"slovenia",      name:"Slovenia",        repCur:"EUR", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:90,JFK:510,LAX:620,DXB:380,SIN:800,NRT:980} },
      { id:"spain",         name:"Spain",           repCur:"EUR", avgDailyUSD:95,  fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:80,JFK:500,LAX:610,DXB:390,SIN:800,NRT:980} },
      { id:"sweden",        name:"Sweden",          repCur:"SEK", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1330,MEL:1310,BNE:1350,PER:1280,LHR:80,JFK:510,LAX:630,DXB:410,SIN:820,NRT:1000} },
      { id:"switzerland",   name:"Switzerland",     repCur:"CHF", avgDailyUSD:180, fxTrend:"stable",    flightTrend:"stable",  flights:{SYD:1310,MEL:1290,BNE:1330,PER:1260,LHR:80,JFK:510,LAX:620,DXB:390,SIN:800,NRT:980} },
      { id:"turkey",        name:"Turkey",          repCur:"TRY", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"falling", flights:{SYD:1150,MEL:1130,BNE:1170,PER:1100,LHR:160,JFK:580,LAX:700,DXB:260,SIN:750,NRT:980} },
      { id:"uk",            name:"United Kingdom",  repCur:"GBP", avgDailyUSD:130, fxTrend:"stable",    flightTrend:"rising",  flights:{SYD:1300,MEL:1280,BNE:1320,PER:1250,LHR:0,JFK:480,LAX:600,DXB:390,SIN:800,NRT:980} },
    ]
  },
  {
    id: "middle_east", name: "Middle East", color: "#c2410c",
    destinations: [
      { id:"jordan", name:"Jordan",       repCur:"JOD", avgDailyUSD:80,  fxTrend:"stable", flightTrend:"stable", flights:{SYD:1050,MEL:1050,BNE:1070,PER:1000,LHR:220,JFK:680,LAX:780,DXB:180,SIN:750,NRT:980} },
      { id:"oman",   name:"Oman",         repCur:"OMR", avgDailyUSD:90,  fxTrend:"stable", flightTrend:"stable", flights:{SYD:980,MEL:980,BNE:1000,PER:920,LHR:280,JFK:720,LAX:820,DXB:80,SIN:580,NRT:900} },
      { id:"saudi",  name:"Saudi Arabia", repCur:"SAR", avgDailyUSD:100, fxTrend:"stable", flightTrend:"stable", flights:{SYD:1000,MEL:1000,BNE:1020,PER:950,LHR:260,JFK:710,LAX:810,DXB:100,SIN:600,NRT:920} },
    ]
  },
  {
    id: "north_america", name: "North America", color: "#1d4ed8",
    destinations: [
      { id:"canada", name:"Canada", repCur:"CAD", avgDailyUSD:120, fxTrend:"stable", flightTrend:"stable", flights:{SYD:1200,MEL:1220,BNE:1180,PER:1350,LHR:480,JFK:80,LAX:100,DXB:880,SIN:1150,NRT:1000} },
      { id:"usa",    name:"USA",    repCur:"USD", avgDailyUSD:150, fxTrend:"stable", flightTrend:"rising",  flights:{SYD:1050,MEL:1070,BNE:1030,PER:1200,LHR:480,JFK:0,LAX:0,DXB:860,SIN:1050,NRT:880} },
    ]
  },
  {
    id: "polar", name: "Polar & Remote", color: "#475569",
    destinations: [
      { id:"antarctica", name:"Antarctica", repCur:"USD", avgDailyUSD:600, fxTrend:"stable", flightTrend:"stable", flights:{SYD:1800,MEL:1820,BNE:1800,PER:1900,LHR:1400,JFK:1300,LAX:1350,DXB:1500,SIN:1800,NRT:1900} },
      { id:"arctic",     name:"Arctic",     repCur:"NOK", avgDailyUSD:400, fxTrend:"stable", flightTrend:"stable", flights:{SYD:1700,MEL:1700,BNE:1720,PER:1750,LHR:380,JFK:620,LAX:780,DXB:780,SIN:1400,NRT:1400} },
    ]
  },
  {
    id: "south_america", name: "South America", color: "#15803d",
    destinations: [
      { id:"argentina",  name:"Argentina",         repCur:"ARS", avgDailyUSD:45,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:680,JFK:320,LAX:380,DXB:1050,SIN:1400,NRT:1350} },
      { id:"bolivia",    name:"Bolivia",           repCur:"BOB", avgDailyUSD:45,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1650,MEL:1670,BNE:1630,PER:1750,LHR:700,JFK:340,LAX:360,DXB:1080,SIN:1430,NRT:1380} },
      { id:"brazil",     name:"Brazil",            repCur:"BRL", avgDailyUSD:65,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1550,MEL:1570,BNE:1530,PER:1650,LHR:620,JFK:280,LAX:380,DXB:1000,SIN:1380,NRT:1330} },
      { id:"chile",      name:"Chile",             repCur:"CLP", avgDailyUSD:70,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1500,MEL:1520,BNE:1480,PER:1600,LHR:680,JFK:320,LAX:340,DXB:1050,SIN:1380,NRT:1320} },
      { id:"colombia",   name:"Colombia",          repCur:"COP", avgDailyUSD:50,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1580,MEL:1600,BNE:1560,PER:1680,LHR:640,JFK:260,LAX:280,DXB:1020,SIN:1400,NRT:1350} },
      { id:"ecuador",    name:"Ecuador",           repCur:"USD", avgDailyUSD:55,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:660,JFK:280,LAX:280,DXB:1040,SIN:1420,NRT:1370} },
      { id:"falklands",  name:"Falkland Islands",  repCur:"FKP", avgDailyUSD:150, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1750,MEL:1770,BNE:1730,PER:1850,LHR:720,JFK:500,LAX:580,DXB:1150,SIN:1550,NRT:1500} },
      { id:"galapagos",  name:"Galapagos Islands", repCur:"USD", avgDailyUSD:250, fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1650,MEL:1670,BNE:1630,PER:1750,LHR:680,JFK:320,LAX:320,DXB:1060,SIN:1440,NRT:1390} },
      { id:"machupicchu",name:"Machu Picchu",      repCur:"PEN", avgDailyUSD:80,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:660,JFK:300,LAX:320,DXB:1040,SIN:1420,NRT:1370} },
      { id:"patagonia",  name:"Patagonia",         repCur:"ARS", avgDailyUSD:100, fxTrend:"improving", flightTrend:"stable", flights:{SYD:1650,MEL:1670,BNE:1630,PER:1750,LHR:700,JFK:360,LAX:420,DXB:1080,SIN:1450,NRT:1400} },
      { id:"peru",       name:"Peru",              repCur:"PEN", avgDailyUSD:55,  fxTrend:"improving", flightTrend:"stable", flights:{SYD:1600,MEL:1620,BNE:1580,PER:1700,LHR:660,JFK:300,LAX:300,DXB:1040,SIN:1420,NRT:1370} },
      { id:"uruguay",    name:"Uruguay",           repCur:"UYU", avgDailyUSD:80,  fxTrend:"stable",    flightTrend:"stable", flights:{SYD:1620,MEL:1640,BNE:1600,PER:1720,LHR:680,JFK:320,LAX:400,DXB:1060,SIN:1430,NRT:1380} },
    ]
  },
];

const ALL_DESTINATIONS = REGION_GROUPS.flatMap(g =>
  g.destinations.map(d => ({ ...d, regionId: g.id, regionName: g.name, regionColor: g.color }))
);

const DEPARTURES = [
  { code:"SYD", label:"Sydney",      cur:"AUD" },
  { code:"MEL", label:"Melbourne",   cur:"AUD" },
  { code:"BNE", label:"Brisbane",    cur:"AUD" },
  { code:"PER", label:"Perth",       cur:"AUD" },
  { code:"LHR", label:"London",      cur:"GBP" },
  { code:"JFK", label:"New York",    cur:"USD" },
  { code:"LAX", label:"Los Angeles", cur:"USD" },
  { code:"DXB", label:"Dubai",       cur:"AED" },
  { code:"SIN", label:"Singapore",   cur:"SGD" },
  { code:"NRT", label:"Tokyo",       cur:"JPY" },
];

const MONTHS = ["January","February","March","April","May","June",
                 "July","August","September","October","November","December"];

const SEASON = {
  January:0.85, February:0.85, March:0.90, April:0.95, May:1.00, June:1.15,
  July:1.25, August:1.20, September:1.05, October:0.95, November:0.90, December:1.10
};

// ─── Scoring ─────────────────────────────────────────────────────────────────

function simFlight(base, month) {
  return Math.round(base * (SEASON[month] || 1) * (0.93 + Math.random() * 0.14));
}

// Returns 0–100: higher = cheaper flight
function calcFlightScore(flightUSD) {
  return Math.max(0, Math.min(100, Math.round(100 - (flightUSD / 2200) * 100)));
}

// Returns 0–100: higher = stronger exchange rate (more local currency per home unit)
function calcFxScore(d, rates, homeCur) {
  const repRate = rates?.[d.repCur] ?? null;
  if (!repRate) return 50; // neutral fallback
  // Normalise: we want a score that's comparable across currencies
  // Strategy: score = how many local units per home unit, normalised against a baseline
  const baselines = {
    XOF:380, BWP:8.5, KMF:290, EGP:20, SZL:12, GHS:9, KES:90, LSL:12,
    MGA:2800, MWK:1150, MAD:6.5, NAD:12, RWF:830, SLL:14000, ZAR:12, TZS:1680,
    GMD:42, TND:2.1, UGX:2500, ZMW:18, ZWL:12, AMD:280, AZN:1.15, IDR:10400,
    BTN:55, MYR:3.1, KHR:4100, CNY:4.9, GEL:1.8, HKD:5.3, INR:55, JPY:97,
    KZT:310, KGS:59, LAK:14000, MVR:10.5, MNT:2300, NPR:88, PKR:190, PHP:38,
    SGD:0.9, KRW:920, LKR:205, TWD:21, TJS:7.3, THB:23, TMT:2.4, UZS:8700,
    VND:17000, AUD:1.0, FJD:1.5, NZD:1.0, PGK:2.6, WST:1.9, VUV:79, BZD:1.4,
    USD:0.65, CRC:510, CUP:170, GTQ:5.1, HNL:11, MXN:11.5, NIO:24, JOD:0.46,
    OMR:0.25, SAR:2.4, CAD:0.88, ALL:61, EUR:0.58, BAM:1.1, BGN:1.1, CZK:15,
    DKK:4.4, HUF:240, ISK:58, PLN:2.6, RON:2.9, GBP:0.51, RSD:70, MKD:36,
    NOK:7.2, SEK:6.9, CHF:0.57, TRY:21, ARS:600, BOB:4.5, BRL:3.3, CLP:600,
    COP:2600, FKP:0.51, PEN:2.5, UYU:27, NOK:7.2,
  };
  const baseline = baselines[d.repCur] ?? 1;
  const ratio = repRate / baseline;
  // ratio > 1 means home currency buys MORE than baseline → good
  const score = Math.round(50 + (ratio - 1) * 80);
  return Math.max(5, Math.min(95, score));
}

function scoreAll(rates, depCode, homeCur, month) {
  return ALL_DESTINATIONS.map(d => {
    const flightBase = d.flights[depCode] ?? 1200;
    const flight = simFlight(flightBase, month);
    const flightScore = calcFlightScore(flight);
    const fxScore = calcFxScore(d, rates, homeCur);
    const combined = Math.round(flightScore * 0.55 + fxScore * 0.45);
    const repRate = rates?.[d.repCur];
    return {
      ...d,
      flight,
      flightScore,
      fxScore,
      combined,
      repRate: repRate ? Number(repRate).toFixed(2) : "—",
    };
  }).sort((a, b) => b.combined - a.combined);
}

function getSignal(combined) {
  if (combined >= 62) return { label: "Promote now", dot: "#16a34a", bg: "#dcfce7", text: "#15803d" };
  if (combined >= 40) return { label: "Monitor",     dot: "#2563eb", bg: "#dbeafe", text: "#1d4ed8" };
  return                    { label: "Hold",         dot: "#94a3b8", bg: "#f1f5f9", text: "#64748b" };
}

// ─── Region group table ───────────────────────────────────────────────────────

function RankedTable({ destinations, selectedId, onSelect, homeCur }) {
  if (!destinations.length) return (
    <div style={{ padding:"2rem", textAlign:"center", color:"#94a3b8", fontSize:13 }}>No destinations match the current filters.</div>
  );
  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", tableLayout:"fixed" }}>
        <colgroup>
          <col style={{ width:"32px" }} />
          <col style={{ width:"18%" }} />
          <col style={{ width:"10%" }} />
          <col style={{ width:"14%" }} />
          <col style={{ width:"14%" }} />
          <col style={{ width:"14%" }} />
          <col style={{ width:"12%" }} />
          <col style={{ width:"10%" }} />
        </colgroup>
        <thead>
          <tr style={{ borderBottom:"1px solid #e2e8f0", background:"#f8fafc" }}>
            <th style={{ padding:"9px 8px", fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"center" }}>#</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.04em" }}>Destination</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"center", textTransform:"uppercase", letterSpacing:"0.04em" }}>Region</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"right", textTransform:"uppercase", letterSpacing:"0.04em" }}>Est. flight pp</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#2563eb", fontWeight:600, textAlign:"right", textTransform:"uppercase", letterSpacing:"0.04em" }}>✈ Flight score</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#16a34a", fontWeight:600, textAlign:"right", textTransform:"uppercase", letterSpacing:"0.04em" }}>$ FX score</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#0f172a", fontWeight:600, textAlign:"right", textTransform:"uppercase", letterSpacing:"0.04em" }}>Combined</th>
            <th style={{ padding:"9px 12px", fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"right", textTransform:"uppercase", letterSpacing:"0.04em" }}>Signal</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((d, i) => {
            const sig = getSignal(d.combined);
            const isSelected = d.id === selectedId;
            return (
              <tr key={d.id} onClick={() => onSelect(d.id)}
                style={{ borderBottom:"0.5px solid #f1f5f9", background: isSelected ? "#eff6ff" : "transparent", cursor:"pointer" }}>
                <td style={{ padding:"10px 8px", fontSize:11, color:"#94a3b8", fontWeight:500, textAlign:"center" }}>{i + 1}</td>
                <td style={{ padding:"10px 12px" }}>
                  <div style={{ fontWeight:600, fontSize:13, color:"#0f172a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.name}</div>
                  <div style={{ fontSize:10, color:"#94a3b8", marginTop:1 }}>1 {homeCur} = {d.repRate} {d.repCur}</div>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"center" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, color:"#64748b" }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:d.regionColor, display:"inline-block", flexShrink:0 }} />
                    {d.regionName}
                  </span>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"right", fontSize:12, fontFamily:"monospace", color:"#334155" }}>
                  {homeCur} {d.flight.toLocaleString()}
                  <div style={{ fontSize:10, color: d.flightTrend==="falling"?"#16a34a": d.flightTrend==="rising"?"#dc2626":"#94a3b8", marginTop:1 }}>
                    {d.flightTrend==="falling"?"↓ falling": d.flightTrend==="rising"?"↑ rising":"stable"}
                  </div>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"right" }}>
                  <div style={{ fontWeight:600, fontSize:14, color:"#2563eb", fontFamily:"monospace" }}>{d.flightScore}</div>
                  <div style={{ height:3, background:"#dbeafe", borderRadius:99, marginTop:4, overflow:"hidden" }}>
                    <div style={{ width:`${d.flightScore}%`, height:"100%", background:"#2563eb", borderRadius:99 }} />
                  </div>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"right" }}>
                  <div style={{ fontWeight:600, fontSize:14, color:"#16a34a", fontFamily:"monospace" }}>{d.fxScore}</div>
                  <div style={{ height:3, background:"#dcfce7", borderRadius:99, marginTop:4, overflow:"hidden" }}>
                    <div style={{ width:`${d.fxScore}%`, height:"100%", background:"#16a34a", borderRadius:99 }} />
                  </div>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"right" }}>
                  <div style={{ fontWeight:700, fontSize:16, color:"#0f172a", fontFamily:"monospace" }}>{d.combined}</div>
                  <div style={{ height:3, background:"#e2e8f0", borderRadius:99, marginTop:4, overflow:"hidden" }}>
                    <div style={{ width:`${d.combined}%`, height:"100%", background:sig.dot, borderRadius:99 }} />
                  </div>
                </td>
                <td style={{ padding:"10px 12px", textAlign:"right" }}>
                  <span style={{ fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:99, background:sig.bg, color:sig.text, whiteSpace:"nowrap" }}>{sig.label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ dest, homeCur, aiData, onClose }) {
  const trendData = ["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => ({
    month: m,
    score: Math.min(97, Math.max(5, Math.round(dest.combined - 8 + i * 2.2 + (Math.random()*5-2.5)))),
  }));
  const sig = getSignal(dest.combined);

  return (
    <div style={{ background:"var(--color-background-primary)", border:"1px solid var(--color-border-secondary)", borderRadius:14, padding:"1.25rem", marginTop:"1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <h2 style={{ fontSize:17, fontWeight:700, margin:0 }}>{dest.name}</h2>
            <span style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:99, background:sig.bg, color:sig.text }}>{sig.label}</span>
            <span style={{ fontSize:11, color:"var(--color-text-secondary)", padding:"3px 9px", background:"var(--color-background-secondary)", borderRadius:99 }}>{dest.regionName}</span>
          </div>
          <p style={{ fontSize:12, color:"var(--color-text-secondary)", margin:"4px 0 0" }}>Combined score: {dest.combined}/100 — Flight: {dest.flightScore}/100 · FX: {dest.fxScore}/100</p>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, color:"var(--color-text-secondary)", padding:4 }}>✕</button>
      </div>

      {/* Dual score bars */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:"1rem" }}>
        {[
          { label:"Est. flight (per person)", value:`${homeCur} ${dest.flight.toLocaleString()}`, sub: dest.flightTrend==="falling"?"−8% vs last year": dest.flightTrend==="rising"?"+12% vs last year":"Stable vs last year", bar:dest.flightScore, barColor:"#2563eb" },
          { label:"FX score (live rate)", value:`${dest.fxScore}/100`, sub:`1 ${homeCur} = ${dest.repRate} ${dest.repCur}`, bar:dest.fxScore, barColor:"#16a34a" },
          { label:"Est. daily cost (pp)", value:`~${homeCur} ${Math.round(dest.avgDailyUSD / 0.65)}/day`, sub:"Mid-range group travel" },
        ].map(c => (
          <div key={c.label} style={{ background:"var(--color-background-secondary)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>{c.label}</div>
            <div style={{ fontSize:17, fontWeight:600, color:"var(--color-text-primary)", fontFamily:"monospace" }}>{c.value}</div>
            {c.bar !== undefined && (
              <div style={{ height:4, background:"var(--color-border-tertiary)", borderRadius:99, margin:"6px 0 4px", overflow:"hidden" }}>
                <div style={{ width:`${c.bar}%`, height:"100%", background:c.barColor, borderRadius:99 }} />
              </div>
            )}
            <div style={{ fontSize:10, color:"var(--color-text-secondary)", marginTop: c.bar !== undefined ? 0 : 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {aiData && (
        <div style={{ background:"var(--color-background-secondary)", borderRadius:10, padding:"12px 14px", marginBottom:"1rem", borderLeft:`3px solid ${sig.dot}` }}>
          <p style={{ fontSize:10, fontWeight:600, color:"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:5 }}>Operator recommendation</p>
          <p style={{ fontSize:13, color:"var(--color-text-primary)", lineHeight:1.65, margin:0 }}>{aiData.rec}</p>
          {aiData.commercial && <>
            <p style={{ fontSize:10, fontWeight:600, color:"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.05em", margin:"10px 0 5px" }}>Commercial insight</p>
            <p style={{ fontSize:13, color:"var(--color-text-primary)", lineHeight:1.65, margin:0 }}>{aiData.commercial}</p>
          </>}
        </div>
      )}

      <p style={{ fontSize:10, color:"var(--color-text-secondary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>6-month combined score trend</p>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={trendData} margin={{ top:5, right:8, left:-22, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
          <XAxis dataKey="month" tick={{ fontSize:10, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0,100]} tick={{ fontSize:10, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background:"var(--color-background-primary)", border:"1px solid var(--color-border-secondary)", borderRadius:8, fontSize:11 }} formatter={v=>[`${v}/100`,"Score"]} />
          <ReferenceLine y={62} stroke="#16a34a" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Line type="monotone" dataKey="score" stroke={sig.dot} strokeWidth={2} dot={{ r:3, fill:sig.dot }} />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:"1rem" }}>
        {[
          ["Draft promotion ↗",   `Write a customer-facing trip promotion for ${dest.name} highlighting the current flight value and exchange rate`],
          ["Itinerary ideas ↗",   `Suggest a ${dest.name} group tour itinerary with highlights and logistics`],
          ["Seasonality risks ↗", `Key seasonality and risk considerations for group tours in ${dest.name}?`],
        ].map(([label, prompt]) => (
          <button key={label}
            onClick={() => alert(`AI prompt:\n\n"${prompt}"`)}
            style={{ padding:"7px 13px", fontSize:11, fontWeight:500, borderRadius:8, border:"1px solid var(--color-border-secondary)", background:"var(--color-background-primary)", color:"var(--color-text-primary)", cursor:"pointer" }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [depCode, setDepCode]       = useState("MEL");
  const [homeCur, setHomeCur]       = useState("AUD");
  const [month, setMonth]           = useState("June");
  const [loading, setLoading]       = useState(false);
  const [status, setStatus]         = useState("");
  const [scored, setScored]         = useState([]);
  const [rates, setRates]           = useState(null);
  const [aiMap, setAiMap]           = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [hasRun, setHasRun]         = useState(false);
  const [regionFilter, setRegionFilter] = useState("all");
  const [signalFilter, setSignalFilter] = useState("all");
  const [top10Report, setTop10Report]   = useState(null);
  const [top10Loading, setTop10Loading] = useState(false);

  const totalDests = ALL_DESTINATIONS.length;
  const depLabel = DEPARTURES.find(d => d.code === depCode)?.label ?? depCode;

  async function runAnalysis(dep = depCode, cur = homeCur, mon = month) {
    setLoading(true); setSelectedId(null); setTop10Report(null);
    setStatus("Fetching live exchange rates...");

    let liveRates = null;
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?from=${cur}`);
      liveRates = (await res.json()).rates;
      setRates(liveRates);
    } catch { setRates(null); }

    setStatus(`Scoring ${totalDests} destinations...`);
    const results = scoreAll(liveRates, dep, cur, mon);
    setScored(results);

    setStatus("Generating AI insights for top picks...");
    const top = results.slice(0, 10);
    const label = DEPARTURES.find(d => d.code === dep)?.label ?? dep;
    const prompt = `Tour operator based in ${label}, planning tours in ${mon}.
Top destinations by combined flight + FX value score:
${top.map((d,i) => `${i+1}. ${d.name} (${d.regionName}) — Flight: ${cur} ${d.flight} pp, Flight score: ${d.flightScore}/100, FX score: ${d.fxScore}/100, Rate: 1 ${cur}=${d.repRate} ${d.repCur}, FX trend: ${d.fxTrend}`).join("\n")}
For each: rec (1 sentence, max 20 words — should the operator promote this now?), commercial (one insight on timing/margin/appeal).
Return ONLY JSON: [{"id":"...","rec":"...","commercial":"..."},...]
IDs: ${top.map(d=>d.id).join(", ")}`;

    try {
      const res = await fetch("/api/insights", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const raw = data.content?.map(b=>b.text||"").join("")||"[]";
      const clean = raw.replace(/```json|```/g,"").trim();
      const start = clean.indexOf("[");
      const end = clean.lastIndexOf("]");
      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(clean.slice(start, end + 1));
        const map = {};
        parsed.forEach(x => { map[x.id] = x; });
        setAiMap(map);
      }
    } catch { setAiMap({}); }

    setHasRun(true); setLoading(false);
    setStatus(liveRates ? `Live rates · ${totalDests} destinations ranked` : `Estimated rates · ${totalDests} destinations ranked`);
  }

  function handleDepChange(e) {
    const dep = DEPARTURES.find(d => d.code === e.target.value);
    setDepCode(dep.code);
    setHomeCur(dep.cur);
    if (hasRun) runAnalysis(dep.code, dep.cur, month);
  }

  function handleMonthChange(e) {
    setMonth(e.target.value);
    if (hasRun) runAnalysis(depCode, homeCur, e.target.value);
  }

  async function generateTop10() {
    if (!scored.length) return;
    setTop10Loading(true);
    setTop10Report(null);
    const top = scored.slice(0, 10);
    const prompt = `You are a tour operator strategist. The operator is based in ${depLabel} and travels in ${month}.

Here are the top 10 destinations ranked by combined flight cost + exchange rate value score:
${top.map((d, i) => `${i + 1}. ${d.name} (${d.regionName}) — Est. flight: ${homeCur} ${d.flight} pp, Flight score: ${d.flightScore}/100, FX score: ${d.fxScore}/100, Combined: ${d.combined}/100, Exchange rate: 1 ${homeCur} = ${d.repRate} ${d.repCur}, FX trend: ${d.fxTrend}, Flight trend: ${d.flightTrend}`).join("\n")}

Write a concise operator briefing covering:
1. A 2-sentence executive summary of the overall opportunity right now
2. For each of the top 10 destinations, one punchy sentence on WHY it's worth promoting — focus on what makes it stand out commercially (cheap flights, weak local currency, good margins, trending demand, etc.)
3. One "act now" recommendation — which single destination should they prioritise and why

Keep it practical, direct, and written for a small tour operator making packaging decisions. No fluff.

Return ONLY a JSON object:
{
  "summary": "...",
  "picks": [{"rank": 1, "name": "...", "why": "..."}, ...],
  "actNow": {"name": "...", "reason": "..."}
}`;

    try {
      const res = await fetch("/api/insights", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, parseAs: "object" }),
      });
      if (!res.ok) { setTop10Report({ error: true }); setTop10Loading(false); return; }
      const parsed = await res.json();
      if (parsed.summary && parsed.picks && parsed.actNow) {
        setTop10Report(parsed);
      } else if (parsed.raw) {
        const clean = parsed.raw.replace(/```json|```/g, "").trim();
        const s = clean.indexOf("{"); const e = clean.lastIndexOf("}");
        if (s !== -1 && e !== -1) {
          const obj = JSON.parse(clean.slice(s, e + 1));
          setTop10Report(obj.summary && obj.picks ? obj : { error: true });
        } else { setTop10Report({ error: true }); }
      } else { setTop10Report({ error: true }); }
    } catch (err) {
      setTop10Report({ error: true, detail: String(err) });
    }
    setTop10Loading(false);
  }

  const filtered = scored
    .filter(d => regionFilter === "all" || d.regionId === regionFilter)
    .filter(d => {
      if (signalFilter === "promote") return d.combined >= 62;
      if (signalFilter === "monitor") return d.combined >= 40 && d.combined < 62;
      if (signalFilter === "hold")    return d.combined < 40;
      return true;
    });

  const selected   = scored.find(d => d.id === selectedId);
  const promoteCount = scored.filter(d => d.combined >= 62).length;
  const topDest    = scored[0];
  const avgScore   = scored.length ? Math.round(scored.reduce((a,d)=>a+d.combined,0)/scored.length) : 0;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        tr:hover { background: #f8fafc !important; }
        button { transition: background 0.1s; }
        select { cursor: pointer; }
      `}</style>

      {/* Hero header — departure city is the centrepiece */}
      <div style={{ background:"#0f172a", color:"#fff", padding:"20px 28px 24px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ fontSize:10, color:"#475569", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, fontFamily:"monospace" }}>Tour operator · Destination Intelligence</div>

          <div style={{ display:"flex", alignItems:"flex-end", gap:24, flexWrap:"wrap" }}>
            {/* Departure — the hero */}
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ fontSize:11, color:"#64748b", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Flying from</div>
              <select
                value={depCode}
                onChange={handleDepChange}
                style={{ fontSize:18, fontWeight:700, color:"#fff", background:"transparent", border:"none", outline:"none", cursor:"pointer", letterSpacing:"-0.01em", appearance:"none", WebkitAppearance:"none", paddingRight:28 }}
              >
                {DEPARTURES.map(d => <option key={d.code} value={d.code} style={{ background:"#1e293b", color:"#fff", fontSize:16 }}>{d.label}</option>)}
              </select>
              <div style={{ fontSize:12, color:"#64748b", marginTop:2, fontFamily:"monospace" }}>{homeCur} · {depCode}</div>
            </div>

            <div style={{ width:"1px", height:52, background:"#1e293b", flexShrink:0 }} />

            {/* Month */}
            <div>
              <div style={{ fontSize:11, color:"#64748b", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Travel window</div>
              <select
                value={month}
                onChange={handleMonthChange}
                style={{ fontSize:18, fontWeight:600, color:"#e2e8f0", background:"transparent", border:"none", outline:"none", cursor:"pointer", appearance:"none", WebkitAppearance:"none" }}
              >
                {MONTHS.map(m => <option key={m} value={m} style={{ background:"#1e293b", color:"#fff", fontSize:15 }}>{m}</option>)}
              </select>
            </div>

            {/* Analyse button */}
            <div style={{ marginLeft:"auto" }}>
              <button
                onClick={() => runAnalysis()}
                disabled={loading}
                style={{ padding:"11px 24px", fontSize:13, fontWeight:600, borderRadius:8, border:"none", background: loading ? "#334155" : "#2563eb", color:"#fff", cursor: loading ? "not-allowed" : "pointer", whiteSpace:"nowrap" }}
              >
                {loading ? "Analysing..." : hasRun ? "Re-run ↗" : "Analyse destinations ↗"}
              </button>
              {status && <div style={{ fontSize:10, color:"#475569", marginTop:6, fontFamily:"monospace", textAlign:"right" }}>{status}</div>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1060, margin:"0 auto", padding:"20px 18px 48px" }}>

        {/* Summary cards */}
        {hasRun && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:"1.25rem", animation:"fadeIn 0.3s ease" }}>
            {[
              { label:"Best value",    value:topDest?.name ?? "—",   sub:`Score ${topDest?.combined ?? "—"}/100` },
              { label:"Promote now",   value:promoteCount,            sub:`of ${totalDests} destinations` },
              { label:"Avg score",     value:avgScore,                sub:"combined flight + FX" },
              { label:"Showing",       value:filtered.length,         sub:`of ${totalDests} destinations` },
            ].map(c => (
              <div key={c.label} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 16px" }}>
                <div style={{ fontSize:10, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>{c.label}</div>
                <div style={{ fontSize:18, fontWeight:700, color:"#0f172a", fontFamily:"monospace" }}>{c.value}</div>
                <div style={{ fontSize:10, color:"#94a3b8", marginTop:3 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Top 10 to promote */}
        {hasRun && (
          <div style={{ marginBottom:"1.25rem", animation:"fadeIn 0.3s ease" }}>
            {!top10Report && !top10Loading && (
              <button
                onClick={generateTop10}
                style={{ width:"100%", padding:"13px", fontSize:13, fontWeight:600, borderRadius:10, border:"2px dashed #e2e8f0", background:"#fff", color:"#334155", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
              >
                <span style={{ fontSize:16 }}>★</span>
                Generate top 10 destinations to promote from {depLabel} in {month}
              </button>
            )}

            {top10Loading && (
              <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:"1.5rem", textAlign:"center", color:"#94a3b8", fontSize:13 }}>
                Analysing scores and generating recommendations...
              </div>
            )}

            {top10Report && !top10Report.error && (
              <div style={{ background:"#fff", border:"2px solid #0f172a", borderRadius:12, overflow:"hidden" }}>
                {/* Report header */}
                <div style={{ background:"#0f172a", padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3, fontFamily:"monospace" }}>AI operator briefing</div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#fff" }}>Top 10 to promote · {depLabel} · {month}</div>
                  </div>
                  <button onClick={() => setTop10Report(null)} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", fontSize:16, padding:"0 4px" }}>✕</button>
                </div>

                {/* Executive summary */}
                {top10Report.summary && (
                  <div style={{ padding:"14px 20px", background:"#f8fafc", borderBottom:"1px solid #e2e8f0" }}>
                    <p style={{ fontSize:13, color:"#334155", lineHeight:1.65, margin:0 }}>{top10Report.summary}</p>
                  </div>
                )}

                {/* Act now callout */}
                {top10Report.actNow && (
                  <div style={{ padding:"12px 20px", background:"#dcfce7", borderBottom:"1px solid #bbf7d0", display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>★</span>
                    <div>
                      <div style={{ fontSize:11, fontWeight:600, color:"#15803d", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>Act now — {top10Report.actNow.name}</div>
                      <p style={{ fontSize:13, color:"#166534", lineHeight:1.6, margin:0 }}>{top10Report.actNow.reason}</p>
                    </div>
                  </div>
                )}

                {/* Ranked picks */}
                {top10Report.picks && (
                  <div style={{ padding:"0" }}>
                    {top10Report.picks.map((p, i) => {
                      const destData = scored.find(d => d.name === p.name) ?? scored[i];
                      const sig = destData ? getSignal(destData.combined) : { bg:"#f1f5f9", text:"#64748b" };
                      return (
                        <div key={i} style={{ display:"grid", gridTemplateColumns:"36px 1fr auto", gap:12, alignItems:"flex-start", padding:"12px 20px", borderBottom: i < top10Report.picks.length - 1 ? "0.5px solid #f1f5f9" : "none" }}>
                          <div style={{ width:28, height:28, borderRadius:"50%", background:"#0f172a", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <span style={{ fontSize:12, fontWeight:700, color:"#fff", fontFamily:"monospace" }}>{p.rank}</span>
                          </div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13, color:"#0f172a", marginBottom:3 }}>{p.name}</div>
                            <div style={{ fontSize:12, color:"#64748b", lineHeight:1.55 }}>{p.why}</div>
                          </div>
                          {destData && (
                            <div style={{ textAlign:"right", flexShrink:0 }}>
                              <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", fontFamily:"monospace" }}>{destData.combined}</div>
                              <span style={{ fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:99, background:sig.bg, color:sig.text }}>{sig.label}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div style={{ padding:"10px 20px", borderTop:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:"#94a3b8" }}>Based on live exchange rates and estimated flight costs</span>
                  <button onClick={generateTop10} style={{ fontSize:11, color:"#2563eb", background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>Regenerate ↗</button>
                </div>
              </div>
            )}

            {top10Report?.error && (
              <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:"1rem", color:"#94a3b8", fontSize:13 }}>
                <div style={{ marginBottom:8 }}>Could not generate recommendations. Debug info:</div>
                <pre style={{ fontSize:11, background:"#f8fafc", padding:"8px", borderRadius:6, overflowX:"auto", color:"#334155", whiteSpace:"pre-wrap", wordBreak:"break-all" }}>
                  {JSON.stringify(top10Report, null, 2)}
                </pre>
                <button onClick={generateTop10} style={{ marginTop:8, fontSize:12, color:"#2563eb", background:"none", border:"none", cursor:"pointer" }}>Try again</button>
              </div>
            )}
          </div>
        )}

        {/* Column key */}
        {hasRun && (
          <div style={{ display:"flex", gap:20, marginBottom:"0.75rem", alignItems:"center", flexWrap:"wrap", animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#334155" }}>
              <span style={{ display:"inline-block", width:10, height:10, borderRadius:2, background:"#2563eb" }} />
              <span><strong>Flight score</strong> — 100 = cheapest possible flight from {depLabel}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#334155" }}>
              <span style={{ display:"inline-block", width:10, height:10, borderRadius:2, background:"#16a34a" }} />
              <span><strong>FX score</strong> — 100 = strongest exchange rate vs your baseline</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#334155" }}>
              <span style={{ display:"inline-block", width:10, height:10, borderRadius:2, background:"#0f172a" }} />
              <span><strong>Combined</strong> — flight (55%) + FX (45%)</span>
            </div>
          </div>
        )}

        {/* Filters */}
        {hasRun && (
          <div style={{ display:"flex", gap:8, marginBottom:"1rem", flexWrap:"wrap", alignItems:"center", animation:"fadeIn 0.3s ease" }}>
            <select value={regionFilter} onChange={e=>{ setRegionFilter(e.target.value); setSelectedId(null); }} style={{ fontSize:12, padding:"5px 10px", border:"1px solid #e2e8f0", borderRadius:8, background:"#fff", color:"#0f172a" }}>
              <option value="all">All regions</option>
              {REGION_GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            {[["all","All"],["promote","Promote now"],["monitor","Monitor"],["hold","Hold"]].map(([key,label]) => (
              <button key={key} onClick={() => { setSignalFilter(key); setSelectedId(null); }}
                style={{ padding:"5px 12px", fontSize:11, fontWeight:500, borderRadius:99, border: signalFilter===key?"none":"1px solid #e2e8f0", background: signalFilter===key?"#0f172a":"#fff", color: signalFilter===key?"#fff":"#475569", cursor:"pointer" }}>
                {label}
              </button>
            ))}
            <span style={{ fontSize:11, color:"#94a3b8", marginLeft:"auto" }}>{filtered.length} destinations · click any row to expand</span>
          </div>
        )}

        {/* Ranked table */}
        {hasRun && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <RankedTable
              destinations={filtered}
              selectedId={selectedId}
              onSelect={id => setSelectedId(selectedId === id ? null : id)}
              homeCur={homeCur}
            />
            {selected && (
              <DetailPanel
                dest={selected}
                homeCur={homeCur}
                aiData={aiMap[selected.id]}
                onClose={() => setSelectedId(null)}
              />
            )}
          </div>
        )}

        {/* Empty state */}
        {!hasRun && (
          <div style={{ textAlign:"center", padding:"4rem 2rem", color:"#94a3b8" }}>
            <div style={{ fontSize:32, marginBottom:12 }}>✈</div>
            <div style={{ fontSize:15, fontWeight:500, color:"#64748b", marginBottom:6 }}>Select a departure city above and run the analysis</div>
            <div style={{ fontSize:13 }}>We'll rank all {totalDests} destinations by flight cost and exchange rate from {depLabel}</div>
          </div>
        )}

        {/* Live rates footer */}
        {hasRun && rates && (
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:"1.5rem", paddingTop:"1rem", borderTop:"0.5px solid #e2e8f0" }}>
            <span style={{ fontSize:11, color:"#94a3b8", alignSelf:"center", fontFamily:"monospace" }}>Live rates — 1 {homeCur} =</span>
            {["THB","EUR","JPY","ZAR","TRY","BRL","INR","MXN","IDR","KES","AED","GBP","SGD"].filter(c=>rates[c]).map(c=>(
              <span key={c} style={{ fontSize:11, background:"#f1f5f9", borderRadius:99, padding:"3px 9px", color:"#64748b", fontFamily:"monospace" }}>
                <strong style={{ color:"#334155" }}>{c}</strong> {Number(rates[c]).toFixed(2)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

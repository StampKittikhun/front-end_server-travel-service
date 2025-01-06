import React from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "../components/FooterSAU.jsx";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
function Register() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  // function
  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (
      travellerFullname === "" ||
      travellerEmail === "" ||
      travellerPassword === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน ");
    } else {
      //ส่งข้อมูลที่ป้อนบันทึกไปยังฐานข้อมูล ผ่าน API (http://localhost:3030/traveller/)
      try {
        const response = await fetch("http://localhost:3030/traveller", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            travellerFullname: travellerFullname,
            travellerEmail: travellerEmail,
            travellerPassword: travellerPassword,
          }),
        });

        if (response.status === 201) {
          alert("บันทึกการลงทะเบียนเรียบร้อยแล้ว(￣┰￣*)");
          window.location.href = "/";
        } else {
          alert("เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง....щ(ʘ╻ʘ)щ");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง....");
      }
    }
  };

  return (
    <>
      <HeaderSAU />
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box sx={{ width: "70%", boxShadow: 2, my: 2, p: 3 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#ffa07a" }}
          >
            My Travel App
          </Typography>
          <Avatar
            alt="Logoapp"
            src="https://media.istockphoto.com/id/1899228994/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=1NJ7fP4Bp9vuP_s3Lp_2x7rIznIZocCKN_YZ0K0N_6M="
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ลงทะเบียนเพื่อสร้างบัญชีผู้ใช้งาน
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography variant="h6">ชื่อ-สกุล</Typography>
          <TextField
            id="travellerFullname"
            variant="outlined"
            placeholder="ชื่อ-สกุล"
            fullWidth
            value={travellerFullname}
            onChange={(e) => setTravellerFullname(e.target.value)}
          />
          <Typography variant="h6">อีเมล์</Typography>
          <TextField
            id="travellerEmail"
            variant="outlined"
            placeholder="Travller@gmail.com"
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography variant="h6">รหัสผ่าน</Typography>
          <TextField
            id="travellerPassword"
            variant="outlined"
            placeholder="********"
            fullWidth
            type="password"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2 }}
            onClick={handleSaveClick}
          >
            บันการลงทะเบียน
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            <Link to="/">กลับไปหน้าเข้าใช้งานใช้งาน</Link>
          </Typography>
        </Box>
      </Box>
      <FooterSAU />
    </>
  );
}

export default Register;

// 📦 Import Components จาก Material-UI
import React from "react";
import { Box, Typography } from "@mui/material";

// ✅ สร้าง Footer Component
function FooterSAU() {
  // 🕒 ดึงปีปัจจุบันแบบอัตโนมัติ
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* 🌟 กล่อง Footer พร้อมสไตล์ที่สวยงาม */}
      <Box
        width="100%"
        textAlign="center"
        sx={{
          p: 3, // ✅ Padding รอบกล่อง
          bgcolor: "#00796b", // 🎨 สีพื้นหลังหลัก
          color: "white", // 🎨 สีตัวอักษร
          mt: 4, // 📏 Margin ด้านบน
          borderTop: "4px solid #004d40", // 🖋️ ขอบด้านบน
          "&:hover": {
            bgcolor: "#004d40", // 🎨 เปลี่ยนสีเมื่อ Hover
            transition: "background-color 0.3s ease-in-out", // ✨ เอฟเฟกต์ลื่นไหล
          },
        }}
        aria-label="Footer Section" // 🔍 ปรับปรุงการเข้าถึง (Accessibility)
      >
        {/* 🏷️ ข้อความส่วนแรก: ชื่อผู้พัฒนา */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          © {currentYear} by Kittikhun T DTI-SAU
        </Typography>

        {/* 🏛️ ข้อความส่วนที่สอง: ชื่อมหาวิทยาลัย */}
        <Typography
          variant="subtitle1"
          sx={{
            fontStyle: "italic", // 📝 ตัวเอียง
            letterSpacing: 1, // 🔡 เพิ่มระยะห่างระหว่างตัวอักษร
            "&:hover": { color: "#ffe082" }, // ✨ เปลี่ยนสีเมื่อ Hover
          }}
        >
          Southheath Asia University
        </Typography>
      </Box>
    </footer>
  );
}

// 🔄 ส่งออก Component เพื่อใช้งานในไฟล์อื่น
export default FooterSAU;

import React, { useEffect, useState } from "react";
import HeaderSAU from "../components/HeaderSAU.jsx";
import FooterSAU from "../components/FooterSAU.jsx";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MyTravel() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [travel, setTravel] = useState([]);

  const handleLogoutClick = () => {
    localStorage.removeItem("traveller");
    window.location.href = "/";
  };

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));

    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      setTravellerEmail(traveller.travellerEmail);
      setTravellerId(traveller.travellerId);

      // ดึงข้อมูลการเดินทางจากนักเดินทาง ผ่าน server เพื่อมาแสดง
      try {
        //ฟังก์ชันดึงข้อมูล
        const fetchData = async () => {
          const reponse = await fetch(
            "http://localhost:3030/travel/" + traveller.travellerId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (reponse.status === 200) {
            const data = await reponse.json();
            setTravel(data["data"]);
          }
        };

        //เรียกใช้ฟังก์ชันดึงข้อมูล
        fetchData();
      } catch (error) {
        alert(
          "เกิดข้อผิดพลาดในการดึงข้อมูลการเดินทาง กรุณาลองใหม่อีกครั้ง.... "
        );
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleDeleteClick = async (travelId) => {
    try {
      const response = await fetch("http://localhost:3030/travel/" + travelId, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert("ลบการเดินทางเรียบร้อยแล้ว(￣┰￣*)");
        window.location.href = "/mytravel";
      } else {
        alert(
          "เกิดข้อผิดพลาดในการลบการเดินทาง กรุณาลองใหม่อีกครั้ง....щ(ʘ╻ʘ)щ"
        );
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการลบการเดินทาง กรุณาลองใหม่อีกครั้ง....щ(ʘ╻ʘ)щ");
    }
  };

  return (
    <>
      <HeaderSAU />
      <Button
        variant="text"
        color="error"
        sx={{ display: "block", mx: "auto" }}
        onClick={handleLogoutClick}
      >
        LOGOUT
      </Button>
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
            การเดินทางของคุณ
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {travellerFullname}
          </Typography>
          {/* ------------------------------------ */}
          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#989898" }}>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">สถานที่เดินทางไป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายตลอดการเดินทาง</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travel.map((row) => (
                  <TableRow
                    key={row.travelId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {travel.indexOf(row) + 1}
                    </TableCell>
                    <TableCell align="center">{row.travelPlace}</TableCell>
                    <TableCell align="center">{row.travelStartDate}</TableCell>
                    <TableCell align="center">{row.travelEndDate}</TableCell>
                    <TableCell align="center">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#067eba", mr: 1 }}
                        component={Link}
                        to={"/updatemytravel/" + row.travelId}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        ml={1}
                        onClick={() => handleDeleteClick(row.travelId)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ------------------------------------ */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2 }}
            component={Link}
            to="/AddMytravel"
          >
            เพิ่มการเดินทาง
          </Button>
        </Box>
      </Box>
      <FooterSAU />
    </>
  );
}

export default MyTravel;

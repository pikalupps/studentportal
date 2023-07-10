import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Heading, Select, FormControl, Input, FormLabel, useColorMode } from "@chakra-ui/react";
import Footer from "../components/Footer";

const EditStudent = () => {
    const navigate = useNavigate()
    const { colorMode } = useColorMode()

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        const loadDetail = async () => {
        setLoading(true);
        try {
            const url = "http://localhost:3001/student/" + id;
            const response = await fetch(url);
            const data = await response.json();
            setStudent(data)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        };

        loadDetail()
    }, [id]);

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value

        let faculty = ""

        if(name === "programStudy"){
            faculty = getFaculty(value)
            console.log(faculty)
        }

        setStudent((Student) => ({ ...Student, [name]: value, faculty}));
    }

    function getFaculty(prodi){
        let faculty = ""

        if(prodi === "Ekonomi" || prodi === "Manajemen" || prodi === "Akuntansi") faculty = "Fakultas Ekonomi"
        else if(prodi === "Administrasi Publik" || prodi === "Administrasi Bisnis" || prodi === "Hubungan Internasional") faculty = "Fakultas Ilmu Sosial dan Politik"
        else if(prodi === "Teknik Sipil" || prodi === "Arsitektur") faculty = "Fakultas Teknik"
        else faculty = "Fakultas Teknologi Informasi dan Sains"

        return faculty
    }

    async function handleEdit(e){
        try {
            e.preventDefault()

            await editStudent()
            navigate("/student")

        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat menambah student');
        }
    }

    async function editStudent() {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(student),
            });
        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat mengubah buku');
        }
      }

    return (
        <>
            <Container p="0" maxW="full" minH="100vh" bg={colorMode === "light" ? "bgLight" : "bgDark"} textColor={colorMode === "light" ? "textLight" : "textDark"} centerContent>
                <Navbar />
                <Heading m="10">Edit Student</Heading>
                {!loading ? (
                    <Container id="form-student" maxW="40%">
                    <img src={student?.profilePicture} alt={student?.fullname} />
                    <FormControl isRequired my="5">
                        <FormLabel>Fullname</FormLabel>
                        <Input id="input-name" name="fullname" data-testid="name" value={student?.fullname} onChange={handleChange} placeholder='Full name' />
                    </FormControl>
                    <FormControl isRequired my="5">
                        <FormLabel>Address</FormLabel>
                        <Input id="address" name="address" data-testid="address" value={student?.address} onChange={handleChange} placeholder='City, Country' />
                    </FormControl>
                    <FormControl isRequired my="5">
                        <FormLabel>Phone Number</FormLabel>
                        <Input id="phoneNumber" name="phoneNumber" data-testid="phoneNumber" value={student?.phoneNumber} onChange={handleChange} placeholder='Phone number' />
                    </FormControl>
                    <FormControl isRequired my="5">
                        <FormLabel>Birth Date</FormLabel>
                        <Input type="date" id="input-date" name="birthDate" value={student?.birthDate} data-testid="date" onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired my="5">
                    <FormLabel>Gender</FormLabel>
                    <Select id="input-gender" name="gender" data-testid="gender" value={student?.gender} onChange={handleChange} placeholder='Select gender'>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </Select>
                </FormControl>
                    <FormControl isRequired my="5">
                        <FormLabel>Program Study</FormLabel>
                        <Select id="input-prody" name="programStudy" data-testid="prody" value={student?.programStudy} onChange={handleChange} placeholder='Select program study'>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Administrasi Publik">Administrasi Publik</option>
                            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                            <option value="Hubungan Internasional">Hubungan Internasional</option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Arsitektur">Arsitektur</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Fisika">Fisika</option>
                            <option value="Informatika">Informatika</option>
                        </Select>
                    </FormControl>
                    <Container centerContent>
                        <Button id="edit-btn" data-testid="edit-btn" onClick={handleEdit} variant={colorMode === "light" ? "light" : "dark"} my="5">Edit Student</Button>
                    </Container>
                </Container>) : (
                    <p>Loading ...</p>
                    )}
                <Footer />
            </Container>
            
        </>
    );
};

export default EditStudent;

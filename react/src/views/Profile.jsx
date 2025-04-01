import { useState, useEffect, useContext } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Button,
    Form,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../service/AuthService";
import CategoryService from "../service/CategoryService";

const authService = new AuthService();
const categoryService = new CategoryService();

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Danh sách đã lưu
    const [tempSelectedCategories, setTempSelectedCategories] = useState([]); // Danh sách tạm thời
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        setLoading(true);

        authService
            .getUserProfile(user.id)
            .then((data) => {
                setProfile(data);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });

        categoryService
            .getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });

        categoryService
            .getFavoriteCategories()
            .then((data) => {
                const initialSelected = data.map((category) => category.id);
                setSelectedCategories(initialSelected);
                setTempSelectedCategories(initialSelected); // Cập nhật vào danh sách tạm
            })
            .catch((error) => {
                console.error("Error fetching favorite categories:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.id]);

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        const categoryId = parseInt(value, 10); // Chuyển value thành số nếu nó là chuỗi

        setTempSelectedCategories((prevSelected) => {
            let newSelected;
            if (checked) {
                newSelected = [...prevSelected, categoryId];
            } else {
                newSelected = prevSelected.filter((id) => id !== categoryId);
            }

            // Log để kiểm tra trạng thái danh sách tạm thời
            console.log("Temporary selected categories:", newSelected);
            return newSelected;
        });
    };

    const handleSaveCategories = () => {
        setSelectedCategories(tempSelectedCategories); // Cập nhật vào danh sách chính

        categoryService
            .saveFavoriteCategories(tempSelectedCategories) // Lưu vào database
            .then(() => {
                alert("Favorite categories saved successfully");
            })
            .catch((error) => {
                console.error("Error saving categories:", error);
            });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!profile) {
        return <h3 className="text-center mt-5">User not found</h3>;
    }

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold">User Profile</h2>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h4 className="text-primary fw-bold">
                                {profile.name || "Unknown User"}
                            </h4>
                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {profile.phone || "N/A"}
                            </p>
                            <p>
                                <strong>Address:</strong>{" "}
                                {profile.address || "N/A"}
                            </p>
                            <p>
                                <strong>Role:</strong>{" "}
                                {profile.is_admin === 1 ? "Admin" : "User"}
                            </p>
                            <p>
                                <strong>Joined At:</strong>{" "}
                                {new Date(
                                    profile.created_at
                                ).toLocaleDateString()}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={6}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h4>Favorite Categories</h4>
                            <Form>
                                {categories.map((category) => (
                                    <Form.Check
                                        key={category.id}
                                        type="checkbox"
                                        label={category.name}
                                        value={category.id}
                                        checked={tempSelectedCategories.includes(
                                            category.id
                                        )}
                                        onChange={handleCategoryChange}
                                    />
                                ))}
                            </Form>
                            <Button
                                className="mt-3"
                                onClick={handleSaveCategories}
                            >
                                Save Categories
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./storySlice";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";

const animatedComponents = makeAnimated();
const AddStory = () => {
  const { categories } = useSelector((state) => state.story);
  const [categoriesChoice, setCategoriesChoice] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const formValues = {
    name: "",
    description: "",
    image: "",
    viewCount: 0,
    isActive: false,
  };
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/all_catergories`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch((e) => console.log(e.message));
    axios
      .get(`${BASE_URL}/users/get_user`, config)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  const handleSubmit = (values) => {
    axios
      .post(
        `${BASE_URL}/story/create_story`,
        {
          ...values,
          author: user._id,
          categories: categoriesChoice,
        },
        config
      )
      .catch((e) => console.log(e.message));
  };
  const initialValues = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),
    description: Yup.string().required("Vui lòng nhập mô tả"),
    image: Yup.string().required("Vui lòng nhập mô gắn ảnh"),
  });
  return (
    <DefaultTemplate>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Formik
            initialValues={formValues}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={initialValues}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className="d-flex flex-column gap-3">
                <div>
                  <label>Tên truyện</label>
                  <Field
                    type="text"
                    name="name"
                    className={`${
                      touched.name && errors.name ? "error" : ""
                    } form-control`}
                    id="name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Mô tả truyện</label>
                  <Field
                    type="text"
                    name="description"
                    className={`${
                      touched.description && errors.description ? "error" : ""
                    } form-control`}
                    id="description"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Gắn liên kết ảnh truyện</label>
                  <Field
                    type="text"
                    name="image"
                    className={`${
                      touched.image && errors.image ? "error" : ""
                    } form-control`}
                    id="image"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Thể loại truyện</label>
                  <Field
                    component={Select}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={categories.map((category) => ({
                      value: category._id,
                      label: category.name,
                    }))}
                    onChange={(selectedOptions) =>
                      setCategoriesChoice(selectedOptions)
                    }
                  />
                </div>
                <Button
                  style={{ background: "#1A73E8", marginTop: 16 }}
                  type="submit"
                  className="btn-sbm pointer"
                  sx={{
                    fontSize: "16px",
                    color: "#FFFFFF",
                  }}
                >
                  Tạo
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default AddStory;

import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Navbar/Loader";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productAction";

const ProductSearch = () => {
  const { keyword = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rating, setRating] = useState(0);

  const { products = [], loading, error } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
    dispatch(getProducts(keyword, { category, priceRange, rating }));
  }, [dispatch, error, keyword, category, priceRange, rating]);

  const goToProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container py-5">
          <Row>
            {/* Filters Column */}
            <Col lg={3} className="mb-4">
              <Card className="p-4 shadow-sm">
                <h4 className="mb-4">Filter Products</h4>

                {/* Category */}
                <Form.Group className="mb-4">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="wax">Hair Wax</option>
                    <option value="shampoo">Shampoo</option>
                    <option value="conditioner">Conditioner</option>
                  </Form.Select>
                </Form.Group>

                {/* Price Range */}
                <Form.Group className="mb-4">
                  <Form.Label>Min Price: Rs. {priceRange[0]}</Form.Label>
                  <RangeSlider
                    min={0}
                    max={priceRange[1]}
                    step={100}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    tooltip="off"
                  />
                  <Form.Label className="mt-3">
                    Max Price: Rs. {priceRange[1]}
                  </Form.Label>
                  <RangeSlider
                    min={priceRange[0]}
                    max={10000}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    tooltip="off"
                  />
                </Form.Group>

                {/* Rating */}
                <Form.Group>
                  <Form.Label>Minimum Rating</Form.Label>
                  <div className="d-flex flex-column gap-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <div
                        key={r}
                        onClick={() => setRating(r)}
                        className={`p-2 rounded border d-flex align-items-center cursor-pointer ${
                          rating === r ? "bg-warning bg-opacity-25" : "bg-light"
                        }`}
                      >
                        {Array.from({ length: r }).map((_, i) => (
                          <IoStar key={i} className="text-warning" />
                        ))}
                        <span className="ms-2 small text-muted">& up</span>
                      </div>
                    ))}
                    {rating !== 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-warning p-0"
                        onClick={() => setRating(0)}
                      >
                        Clear Rating Filter
                      </Button>
                    )}
                  </div>
                </Form.Group>
              </Card>
            </Col>

            {/* Products Column */}
            <Col lg={9}>
              <Row>
                {products.length === 0 ? (
                  <p className="text-center text-muted mt-5">
                    No products found with current filters.
                  </p>
                ) : (
                  products.map((product) => (
                    <Col md={6} lg={4} key={product._id} className="mb-4">
                      <Card
                        className="h-100 shadow-sm border-0 card-hover"
                        onClick={() => goToProduct(product)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="position-absolute top-0 end-0 m-2 text-danger fs-4">
                          <AiOutlineHeart />
                        </div>
                        <Card.Img
                          variant="top"
                          src={
                            product.images?.[0]?.url ||
                            product.images?.[0]?.image ||
                            product.images?.[0] ||
                            "/default.jpg"
                          }
                          className="p-3"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="text-center text-truncate">
                            {product.name}
                          </Card.Title>
                          <Card.Text className="text-center text-orange fw-bold">
                            Rs. {product.price}
                          </Card.Text>
                          <div className="d-flex justify-content-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const full = i < Math.floor(product.ratings);
                              const half =
                                i === Math.floor(product.ratings) &&
                                product.ratings % 1 >= 0.5;
                              return full ? (
                                <IoStar
                                  key={i}
                                  className="text-warning"
                                  size={18}
                                />
                              ) : half ? (
                                <IoStarHalf
                                  key={i}
                                  className="text-warning"
                                  size={18}
                                />
                              ) : (
                                <IoStarOutline
                                  key={i}
                                  className="text-muted"
                                  size={18}
                                />
                              );
                            })}
                            <span className="ms-2 small text-muted">
                              ({product.numOfReviews})
                            </span>
                          </div>
                          <Button
                            variant="warning"
                            className="mt-auto w-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToProduct(product);
                            }}
                          >
                            Buy Now
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default ProductSearch;

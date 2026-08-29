import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { fallbackCoordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  addCardLike,
  addItem,
  getItems,
  removeCardLike,
  removeItem,
  updateUser,
} from "../../utils/api";
import { checkToken, login, register } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLogin = (credentials) => {
    return login(credentials)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch(console.error);
  };

  const handleRegister = (userData) => {
    return register(userData).then(() =>
      handleLogin({ email: userData.email, password: userData.password }),
    );
  };

  const handleUpdateProfile = (userData) => {
    updateUser(userData, token)
      .then((user) => {
        setCurrentUser((prev) => ({ ...prev, ...user }));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes?.some(
      (id) => String(id) === String(currentUser?._id),
    );
    const updateLike = isLiked ? removeCardLike : addCardLike;

    updateLike(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, token)
      .then(({ data }) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const loadWeatherForCurrentLocation = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    const fallbackToDefaultWeather = () => {
      loadWeatherForCurrentLocation(fallbackCoordinates);
    };

    if (!navigator.geolocation) {
      fallbackToDefaultWeather();
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          loadWeatherForCurrentLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        fallbackToDefaultWeather,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);

    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setToken(null);
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleDeleteItem = (item) => {
    removeItem(item._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((i) => i._id !== item._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteRequest = (item) => {
    setSelectedCard(item);
    setActiveModal("delete");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfile={() => setActiveModal("edit-profile")}
                      onSignOut={handleSignOut}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={() => setActiveModal("register")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteRequest}
          />
          <DeleteModal
            isOpen={activeModal === "delete"}
            onClose={closeActiveModal}
            onConfirm={() => handleDeleteItem(selectedCard)}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

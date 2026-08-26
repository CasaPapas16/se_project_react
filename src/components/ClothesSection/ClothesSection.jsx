import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__rows">
        <p className="clothes-section__address">Your items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

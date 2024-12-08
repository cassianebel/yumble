import { useState, useRef, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RandomRecipes from "./RandomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";
import SearchChooser from "./SearchChooser";
import FavoritesList from "./FavoritesList";

const Home = ({ favorites, setFavorites }) => {
  const [tab, setTab] = useState("diet");
  const nodeRefs = useRef({});

  const getNodeRef = (key) => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = createRef();
    }
    return nodeRefs.current[key];
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <SearchChooser tab={tab} setTab={setTab} />
        <div className="m-5 max-w-xl md:mx-auto">
          <TransitionGroup>
            <CSSTransition
              key={tab}
              timeout={300}
              classNames="zoom"
              nodeRef={getNodeRef(tab)}
            >
              <div ref={getNodeRef(tab)}>
                {tab === "ingredients" ? (
                  <IngredientSearchForm />
                ) : tab === "nutrients" ? (
                  <NutrientSearchForm />
                ) : (
                  <SearchForm />
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      {favorites.length > 0 && (
        <div className="m-5">
          <FavoritesList favorites={favorites} setFavorites={setFavorites} />
        </div>
      )}
      <div className="m-5 mb-20">
        <RandomRecipes />
      </div>
    </div>
  );
};

export default Home;

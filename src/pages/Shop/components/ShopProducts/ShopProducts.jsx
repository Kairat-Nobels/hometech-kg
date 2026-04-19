import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { FaFilter } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { useSelector } from 'react-redux';
import "./shopProducts.scss";
import Spinner from '../../../../components/Spinner/Spinner';

const ShopProducts = () => {
    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    const selectedCategory = useSelector((state) => state.filterReducer.selectedCategory);
    const { categories } = useSelector((state) => state.categoriesReducer);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortValue, setSortValue] = useState('');

    const minPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.min(...items.map((i) => Number(i.price) || 0));
    }, [items]);

    const maxPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.max(...items.map((i) => Number(i.price) || 0));
    }, [items]);

    useEffect(() => {
        if (items.length) {
            setPriceRange([minPrice, maxPrice]);
        }
    }, [minPrice, maxPrice, items.length]);

    const filteredItems = items.filter((item) => {
        if (search && !item.title?.toLowerCase().includes(search.toLowerCase())) return false;
        if (selectedCategories.length && !selectedCategories.includes(item.category)) return false;
        if ((Number(item.price) || 0) < priceRange[0] || (Number(item.price) || 0) > priceRange[1]) return false;
        if (selectedCategory && selectedCategory !== "All" && item.category !== selectedCategory) return false;
        return true;
    });

    const sortedItems = useMemo(() => {
        const arr = [...filteredItems];

        if (sortValue === "Low") arr.sort((a, b) => a.price - b.price);
        if (sortValue === "High") arr.sort((a, b) => b.price - a.price);
        if (sortValue === "Name") arr.sort((a, b) => a.title.localeCompare(b.title, 'ru'));

        return arr;
    }, [filteredItems, sortValue]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSearch('');
        setSortValue('');
        setPriceRange([minPrice, maxPrice]);
    };

    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        if (showFilters) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilters]);

    return (
        <div className="shop-products">
            <div className="shop-top">
                <div className="shop-heading">
                    <span className="shop-label">Каталог</span>
                    <h1>Бытовая техника</h1>
                    <p>Выберите нужную категорию, найдите товар по названию и отсортируйте результаты.</p>
                </div>
            </div>

            <div className="filter-part">
                <div className="filter-dropdown-wrapper" ref={filterRef}>
                    <button
                        className="filter-button"
                        onClick={() => setShowFilters((prev) => !prev)}
                    >
                        <FaFilter />
                        <span>Фильтры</span>
                    </button>

                    {showFilters && (
                        <div className="filters-dropdown">
                            <div className="filters-block">
                                <label className="filters-title">Категории</label>
                                <div className="category-checkboxes">
                                    {categories.map((category) => (
                                        <label key={category.id} className="category-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => handleCategoryChange(category.name)}
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filters-block">
                                <label className="filters-title">Цена</label>

                                <div className="price-values">
                                    <span>от {priceRange[0]} сом</span>
                                    <span>до {priceRange[1]} сом</span>
                                </div>

                                <div className="range-wrap">
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[0]}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setPriceRange([Math.min(val, priceRange[1]), priceRange[1]]);
                                        }}
                                    />

                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setPriceRange([priceRange[0], Math.max(val, priceRange[0])]);
                                        }}
                                    />
                                </div>
                            </div>

                            <button className="clear-filters-btn" onClick={clearAllFilters}>
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>

                <div className="search-box">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={() => setSearch('')}
                            aria-label="Очистить поиск"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                <select
                    name="sort-list"
                    id="sort-list"
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                >
                    <option value="">По умолчанию</option>
                    <option value="Low">Сначала дешевые</option>
                    <option value="High">Сначала дорогие</option>
                    <option value="Name">По названию</option>
                </select>
            </div>

            <div className="shop-results-info">
                <p>Найдено товаров: <span>{sortedItems.length}</span></p>
            </div>

            <div className="row">
                {loading ? (
                    <div className="center">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="fetchError">
                        <p>😕 Ошибка: {error}</p>
                        <p>Проверьте интернет и обновите страницу</p>
                    </div>
                ) : sortedItems.length === 0 ? (
                    <div className="empty-products">
                        <h3>Товары не найдены</h3>
                        <p>Попробуйте изменить фильтры или очистить поиск.</p>
                    </div>
                ) : (
                    sortedItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            image={item.image}
                            title={item.title}
                            category={item.category}
                            price={item.price}
                            oldPrice={item.oldPrice}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ShopProducts;

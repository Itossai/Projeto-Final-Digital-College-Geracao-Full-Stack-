import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterGroup from "../components/FilterGroup";
import Layout from "../components/Layout";
import ProductListing from "../components/ProductListing";
import Section from "../components/Section";
import products from "../data/products";

const filterGroups = [
    {
        key: "brand",
        title: "Marca",
        inputType: "checkbox",
        options: ["Nike", "Adidas", "Puma", "K-Swiss"].map((text) => ({
            text,
            value: text,
        })),
    },
    {
        key: "category",
        title: "Categoria",
        inputType: "checkbox",
        options: ["Casual", "Esporte", "Corrida"].map((text) => ({
            text,
            value: text,
        })),
    },
    {
        key: "gender",
        title: "Gênero",
        inputType: "checkbox",
        options: ["Masculino", "Feminino", "Unissex"].map((text) => ({
            text,
            value: text,
        })),
    },
];

const ProductListingPage = () => {
    const [searchParams] = useSearchParams();
    const [sortOrder, setSortOrder] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        brand: [],
        category: [],
        gender: [],
    });

    const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesFilters = filterGroups.every(({ key }) => {
            const selectedValues = selectedFilters[key];
            return (
                selectedValues.length === 0 ||
                selectedValues.includes(product[key])
            );
        });

        return matchesSearch && matchesFilters;
    });

    const displayedProducts = [...filteredProducts].sort((first, second) => {
        const firstPrice = first.priceDiscount ?? first.price;
        const secondPrice = second.priceDiscount ?? second.price;

        if (sortOrder === "lowest") {
            return firstPrice - secondPrice;
        }

        if (sortOrder === "highest") {
            return secondPrice - firstPrice;
        }

        return 0;
    });

    const updateFilter = (key, value, isSelected) => {
        setSelectedFilters((currentFilters) => ({
            ...currentFilters,
            [key]: isSelected
                ? [...currentFilters[key], value]
                : currentFilters[key].filter(
                      (selectedValue) => selectedValue !== value,
                  ),
        }));
    };

    const productCountLabel =
        displayedProducts.length === 1
            ? "1 produto encontrado"
            : `${displayedProducts.length} produtos encontrados`;

    return (
        <Layout>
            <main>
                <aside>
                    <div>
                        <label htmlFor="product-sort">Ordenar por</label>
                        <select
                            id="product-sort"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="lowest">Menor preço</option>
                            <option value="highest">Maior preço</option>
                        </select>
                    </div>

                    <section>
                        <h2>Filtrar por</h2>
                        <hr />
                        {filterGroups.map((group) => (
                            <FilterGroup
                                key={group.key}
                                title={group.title}
                                inputType={group.inputType}
                                options={group.options}
                                selectedValues={selectedFilters[group.key]}
                                onChange={(value, isSelected) =>
                                    updateFilter(group.key, value, isSelected)
                                }
                            />
                        ))}
                    </section>
                </aside>

                <Section title={productCountLabel} titleAlign="left">
                    <ProductListing products={displayedProducts} />
                </Section>
            </main>
        </Layout>
    );
};

export default ProductListingPage;
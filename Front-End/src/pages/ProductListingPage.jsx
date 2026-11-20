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

    const searchQuery = (
        searchParams.get("filter") ??
        searchParams.get("q") ??
        ""
    )
        .trim()
        .toLowerCase();
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
            <main className="flex flex-column lg:flex-row gap-4 px-3 md:px-5 lg:px-7 py-5">
                <aside
                    className="flex flex-column gap-4 flex-shrink-0"
                    style={{ width: "308px", maxWidth: "100%" }}
                >
                    <div className="flex flex-column gap-2">
                        <label
                            htmlFor="product-sort"
                            style={{
                                color: "var(--dark-gray-2)",
                                fontSize: "16px",
                            }}
                        >
                            Ordenar por
                        </label>
                        <select
                            id="product-sort"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                            className="px-3"
                            style={{
                                width: "308px",
                                maxWidth: "100%",
                                height: "60px",
                                color: "var(--dark-gray-2)",
                                border: "1px solid var(--light-gray-2)",
                                borderRadius: "4px",
                                backgroundColor: "var(--white)",
                            }}
                        >
                            <option value="">Selecione</option>
                            <option value="lowest">Menor preço</option>
                            <option value="highest">Maior preço</option>
                        </select>
                    </div>

                    <Section
                        title="Filtrar por"
                        titleAlign="left"
                        className="p-4"
                        titleStyle={{
                            color: "var(--dark-gray-2)",
                            fontSize: "16px",
                        }}
                        style={{
                            width: "308px",
                            maxWidth: "100%",
                            backgroundColor: "var(--white)",
                        }}
                    >
                        <hr
                            className="my-3"
                            style={{
                                border: "none",
                                borderTop: "1px solid var(--light-gray-2)",
                            }}
                        />
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
                    </Section>
                </aside>

                <div className="flex-1 min-w-0">
                    <Section title={productCountLabel} titleAlign="left">
                        <ProductListing products={displayedProducts} />
                    </Section>
                </div>
            </main>
        </Layout>
    );
};

export default ProductListingPage;
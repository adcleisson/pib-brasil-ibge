import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import api from "../services/api.js";
import { useTheme} from "../context/ThemeContext.jsx";


const usdToBrl = {
    1996: 1.0051, 1997: 1.0779, 1998: 1.1605, 1999: 1.8207,
    2000: 1.8301, 2001: 2.3527, 2002: 2.9213, 2003: 3.0750,
    2004: 2.9262, 2005: 2.4352, 2006: 2.1738, 2007: 1.9461,
    2008: 1.8326, 2009: 1.9976, 2010: 1.7600, 2011: 1.6723,
    2012: 1.9535, 2013: 2.1570, 2014: 2.3512, 2015: 3.3360,
    2016: 3.4839, 2017: 3.1910, 2018: 3.6513, 2019: 3.9440,
    2020: 5.1587, 2021: 5.3958, 2022: 5.1605,
};


const formatNumber = (value, isCurrency = false) => {
    if (value == null) return "-";
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export default function Graphics() {
    const [data, setData] = useState([]);
    const { theme } = useTheme();


    const pgText = theme === "light" ? "#000" : "#b3deff";
    const ghText = theme === "light" ? "#000" : "#ffffff";
    const ghColor = theme === "light" ? "#c4d4e2" : "#042037";
    const bgColor = theme === "light" ? "rgba(255,255,255,0)" : "#13191e";

    useEffect(() => {
        async function fetchData() {
            try {
                const pibRes = await api.get("/agregados/6784/periodos/all/variaveis/9808?localidades=BR");
                const pibCapitaRes = await api.get("/agregados/6784/periodos/all/variaveis/9812?localidades=BR");

                const pibData = pibRes.data[0].resultados[0].series[0].serie;
                const pibCapitaData = pibCapitaRes.data[0].resultados[0].series[0].serie;

                const years = Object.keys(pibData);

                const chartData = years.map((year) => {
                    const rate = usdToBrl[year] || null;
                    return {
                        year,
                        pib: rate ? (Number(pibData[year]) * 1_000_000) / rate / 1_000_000_000 : null, // bilhões USD
                        pibPerCapita: rate ? Number((Number(pibCapitaData[year]) / rate).toFixed(2)) : null, // USD per capita
                    };
                });

                setData(chartData);
            } catch (error) {
                console.error("Erro ao buscar dados do IBGE:", error);
            }
        }

        fetchData();
    }, []);

    const cardStyle = {
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "7%",
        width: "100%",
        maxWidth: "85%",
        padding: "20px",
        backgroundColor: ghColor,
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        overflowX: "auto",
        transition: "0.8s"
    };

    const titleStyle = {
        textAlign: "center",
        marginBottom: "20px",
        color: ghText,
        fontWeight: "600"
    };

    return (
        <div style={{backgroundColor: bgColor}} className="mt-0 w-full min-h-screen">
            <div className="text-center py-5">
                <h1 style={{ color: pgText}} className="mt-10  text-5xl font-semibold text-center transition-colors duration-300">
                    Gráficos evolução do PIB em dólares
                </h1>
            </div>

            <div style={{ ...cardStyle, height: "400px" }}>
                <h2 style={titleStyle}>Evolução do PIB Total (US$ Bilhões)</h2>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 15, bottom: 0 }}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(val) => formatNumber(val)} />
                        <Tooltip
                            formatter={(val) => formatNumber(val, true)}
                            labelFormatter={(label) => `Ano: ${label}`}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="pib"
                            stroke="#007bff"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="PIB Total (US$ Bi)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ ...cardStyle, height: "400px" }}>
                <h2 style={titleStyle}>Evolução do PIB Per Capita (US$)</h2>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 15, bottom: 0 }}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(val) => formatNumber(val)} />
                        <Tooltip
                            formatter={(val) => formatNumber(val, true)}
                            labelFormatter={(label) => `Ano: ${label}`}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="pibPerCapita"
                            stroke="#28a745"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="PIB Per Capita (US$)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h2 style={{ color: "#fff", fontSize: "22px" }}></h2>
                <p style={{ color: "#ccc", maxWidth: "700px", margin: "0 auto" }}></p>
            </div>
        </div>
    );
}

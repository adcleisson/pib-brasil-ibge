import { useEffect, useState } from "react";
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
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + (isCurrency ? " US$" : "");
};

export default function Table() {
    const [data, setData] = useState([]);
    const { theme } = useTheme();
    const pgText = theme === "light" ? "#000" : "#b3deff";
    const tbText = theme === "light" ? "#000" : "#ffffff";
    const tbColor = theme === "light" ? "#c4d4e2" : "#042037";
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
                        pib: rate ? (Number(pibData[year]) * 1_000_000) / rate / 1_000_000_000 : null,
                        pibPerCapita: rate ? Number((Number(pibCapitaData[year]) / rate).toFixed(2)) : null,
                    };
                });

                setData(chartData);
            } catch (error) {
                console.error("Erro ao buscar dados do IBGE:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{backgroundColor: bgColor}} className="min-h-screen p-6 ">
            <h1 style={{color: pgText}} className="mt-5 mb-15 text-5xl font-semibold text-center transition-colors duration-300">
                Tabela de PIB por ano no Brasil
            </h1>
            <div className=" overflow-x-auto transition-colors duration-300">
                <table style={{backgroundColor: tbColor}} className="min-w-full border  transition-colors duration-300">
                    <thead style={{backgroundColor: tbColor}} className=" transition-colors duration-300">
                    <tr>
                        <th style={{color: tbText}} className="px-4 py-2 border transition-colors duration-300">
                            Ano
                        </th>
                        <th style={{color: tbText}} className="px-4 py-2 border transition-colors duration-300">
                            PIB Total (US$ Bi)
                        </th>
                        <th style={{color: tbText}} className="px-4 py-2 border transition-colors duration-300 ">
                            PIB Per Capita (US$)
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.year} className="text-center transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-gray-400 "
                        >
                            <td style={{color: tbText}} className="px-4 py-2 border ">{row.year}</td>
                            <td style={{color: tbText}} className="px-4 py-2 border ">{formatNumber(row.pib, true)}</td>
                            <td style={{color: tbText}} className="px-4 py-2 border ">{formatNumber(row.pibPerCapita, true)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

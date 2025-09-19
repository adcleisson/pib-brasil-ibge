import { useEffect, useState } from "react";
import api from "../services/api.js";

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
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-5xl font-semibold text-center mb-6">Tabela de PIB</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-2 border">Ano</th>
                        <th className="px-4 py-2 border">PIB Total (US$ Bi)</th>
                        <th className="px-4 py-2 border">PIB Per Capita (US$)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.year} className="text-center">
                            <td className="px-4 py-2 border">{row.year}</td>
                            <td className="px-4 py-2 border">{formatNumber(row.pib, true)}</td>
                            <td className="px-4 py-2 border">{formatNumber(row.pibPerCapita, true)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Chatbox from "../Chatbox/Chatbox";
import { BlackboxAI } from "../AI-agent/blackboxAI/BlackboxAI";


export interface compoundType {
    name: string;
    description: string;
    uses: string[];
    chemicalFormula: string;
    facts: string[];
    boilingPoint: string;
    meltingPoint: string;
}

export default function SearchCompound() {
    const [compounds, setCompounds] = useState<compoundType|null>(null);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();
    const router = useNavigate();
    const loadCompound = async () => {
        if (!name) return ;
        await BlackboxAI("query", [{role:"ntg", content: name}]).then((res) => {
            setCompounds(JSON.parse(res.split("#SEP#")[1]));
            setLoading(false);
        })
    }
    useEffect(() => {loadCompound();},[name]);
    if (!name || name === '') router('/');
    if (loading) return <div className="p-3 flex items-center justify-center text-white text-3xl bg-black flex-col min-h-screen w-full max-sm:p-5">Searching for the best fit compound/element...</div>;
    return(
        <div className="p-3 flex items-start justify-start text-white bg-black flex-col min-h-screen w-full max-sm:p-5">
            <Link to="/" className="text-lg text-blue-700 font-bold flex items-center justify-center w-36 h-auto p-2 bg-neutral-800 rounded-lg">Back</Link>
            <div className="flex flex-col w-full gap-5 max-sm:gap-3 border-0 border-white max-sm:border-2 rounded-md p-4">
            <div className="flex flex-row items-center flex-wrap w-full gap-3 py-2">
                {/* Image */}
                <div className="flex items-center justify-center w-28 h-28 overflow-hidden p-1 bg-slate-900 font-bold rounded-lg">
                    {compounds?.chemicalFormula}
                </div>
                {/* Name and chemical formula */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold">{compounds?.name}</h1>
                    <p className="text-lg">{compounds?.chemicalFormula}</p>
                </div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Description</h1>
                <p className="text-lg">{compounds?.description}</p>
            </div>
            {/* Boiling Point and melting point */}
            <div className="flex flex-row flex-wrap gap-3 max-md:my-0 my-4">
                <div className="flex flex-row p-1 gap-1">
                    <h1 className="text-xl font-bold">Boiling Point: </h1>
                    <p className="text-lg text-red-600">{compounds?.boilingPoint}</p> 
                </div>
                <div className="flex flex-row p-1 gap-1">
                    <h1 className="text-xl font-bold">Melting Point: </h1>
                    <p className="text-lg text-blue-700">{compounds?.meltingPoint}</p> 
                </div>
            </div>
            {/* Uses */}
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Uses</h1>
                {compounds?.uses.map((use, index) => (
                    <p className="text-lg my-1 w-full p-2 border border-white rounded-lg" key={index}>{use}</p>
                ))}
            </div>
            {/* Facts */}
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Facts</h1>
                {compounds?.facts.map((fact, index) => (
                    <p className="text-lg my-1 w-full p-2 border border-white rounded-lg" key={index}>{fact}</p>
                ))}
            </div>
            </div>
            {!loading && <Chatbox name={compounds?.name} formula={compounds?.chemicalFormula} />}
        </div>
    )
}
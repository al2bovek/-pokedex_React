import { useEffect, useState } from "react";

export const ThingsList = () => {
    const [things, setThings] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [title, setTitle] = useState("");
    const [hp, setHp] = useState("");
    const [frontImg, setFrontImg] = useState("");
    const [backImg, setBackImg] = useState("");

    const getData = async () => {
        try {
            // const response = await fetch("http://localhost:3000/pokemons");
            const response = await fetch("public/db.json");
            
            if (!response.ok) throw new Error(`Error! Status: ${response.status}`);
            const result = await response.json();
            setThings(result);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async () => {
        if (!title || !hp || !frontImg || !backImg) {
            setError("data are required");
            return;
        }
        setError("");
        const newThing = {
            title: title,
            hp: hp,
            img: frontImg,
            backImg: backImg,
        };

        try {
            const resposne = await fetch("http://localhost:3000/pokemon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newThing),
            });
            if (resposne.ok) {
                getData();
                setTitle("");
                setHp("");
                setFrontImg("");
                setBackImg("");
            }
        } catch (error) {
            setError("Error");
        }
    };

    const filteredThings = things.filter((thing) =>
        thing.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div >
                {error}
            </div>
            <h1 className="text-3xl">Pokemon Searcher</h1>
            <form
                className="py-6 flex justify-between [&>label]:mx-2 [&>label>input]:px-2 [&>label>input]:border [&>label>input]:p-1"
            >
                <label >
                    Name:
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label >
                    hp:
                    <input
                        type="number"
                        placeholder="hp"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                    />
                </label>

                <label >
                    Front Image URL:
                    <input
                        type="text"
                        placeholder="url"
                        value={frontImg}
                        onChange={(e) => setFrontImg(e.target.value)}
                    />
                </label>

                <label >
                    Back Image URL:
                    <input
                        type="text"
                        placeholder="url"
                        value={backImg}
                        onChange={(e) => setBackImg(e.target.value)}
                    />
                </label>
            </form>

            <div className="py-2 border-amber-800">
                <button onClick={handleSubmit} className="border-amber-600">
                    Submit
                </button>
            </div>


            <div className="py-6 ">
                <input
                    className="border rounded-4xl py-2 mx-3"
                    type="text"
                    placeholder="Search... ❤️"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div
                className="flex  flex-wrap gap-6 justify-around "
            >
                {filteredThings.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="flex flex-col w-[15%] border"
                    >
                        <img
                            className="w-[90%]"
                            src={pokemon.img}
                            alt={pokemon.name}
                        />
                        <p >{pokemon.name}</p>
                        <p >❤️ {pokemon.hp} hp</p>
                    </div>
                ))}
            </div>
        </>
    );
}

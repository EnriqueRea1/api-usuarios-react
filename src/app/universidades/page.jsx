import axios from "axios";

async function getNoticias(){
    const url="http://universities.hipolabs.com/search?country=Mexico"
    axios.get(url);
    const universidades = await axios.get(url);
    //console.log(universidades.data);
    return universidades.data;
}

//noticias();

export default async function Universidades(){
    const universidades = await getNoticias();
    return(
        <>
            <h1>Universidades</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Universidad</th>
                        <th>Sitio Web</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        universidades.map((universidad,i)=>(
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{universidad.name}</td>
                                <td>{universidad.web_pages[0]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
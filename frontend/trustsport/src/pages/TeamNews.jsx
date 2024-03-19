import { useParams, Link } from "react-router-dom";
import SimpleNews from "../components/SimpleNews";
import { useEffect, useState } from "react";




export default function TeamNews() {
    const { team } = useParams();
    const [teamNews, setTeamNews] = useState([])

    useEffect(() => {
        fetchTeamNews();
    },[])

    const fetchTeamNews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/getNews/${team}`, {
            headers: {
                'Content-Type': 'application/json' // Specify content type if needed
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            setTeamNews(data);
        } catch (error) {
            console.error('Error fetching news:', error.message);
        }
        };

    
    return (
        <Link to={{ pathname: `/news`, state: { team: team } }} className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
        <div className="bg-white py-6">
        <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
            <div className="flex flex-row flex-wrap">
            <div className="flex-shrink max-w-full w-full overflow-hidden">
                <div className="w-full py-3">
                <h2 className="text-gray-800 text-2xl pt-3 font-bold">
                    <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>{team}
                </h2>
                </div>
                <div className="flex flex-row flex-wrap -mx-3">
                    {
                        teamNews.map((news, index) => (
                            <SimpleNews key={index} news={news}/>
                        ))
                    }
                </div>
            </div>
            </div>
        </div>
        </div>
        </Link>
    )
}
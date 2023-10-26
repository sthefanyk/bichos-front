import CardAnimal from '@/components/CardAnimal';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Link from 'next/link';
import Filter from '@/components/Filter';
import ListCardAnimal from '@/components/ListCardAnimal';


export default async function Home() {

    const posts = await fetch("http://localhost:3000/post/adopt", {
        cache: 'no-store'
    })
		.then((response) => {
			if (!response.ok) {
				throw new Error("Erro na solicitação");
			}
			return response.json();
		})
		.then((responseData) => {
            return responseData.data;
		})

    const user = await fetch(`http://localhost:3000/person/8afef2fe-30db-48e4-8106-0de36f39232f`, {
        cache: 'no-store'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na solicitação");
            }
            return response.json();
        })
        .then((responseData) => {
            return responseData;
        })

   
    return (
        <>
            <Header />
            <ListCardAnimal />
        </>
    )
}




import axios from "axios"
type University = {
    "alpha_two_code": string
    "web_pages": URL[]
    "state-province": boolean,
    "name": string
    "domains": URL[]
    "country": string
}

export async function getUniversities({
    university
}: {
    university: string;
}): Promise<University[]> {
    try {
        const { data, status } = await axios.get(`http://universities.hipolabs.com/search?country=Czech+Republic&name=${university}`)

        if (status !== 200) throw new Error("Error")
        return data

    } catch (e) {

        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        }
        throw new Error("Unexpected error")
    }

}


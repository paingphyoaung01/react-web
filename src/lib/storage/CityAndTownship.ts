
export type cityProps = { code?: string, id: number, name: string }
export type townshipProps = { code?: string, id: number, city_id?: number, name: string, area_id?: number }

export const getCity = () => {
    let raw = localStorage.getItem("@App")
    let data: Array<cityProps> = [{}]
    if (raw) data = JSON.parse(raw).city
    return data
}

export const getCityByName = (name = "") => {
    let raw = localStorage.getItem("@App")
    let data: Array<cityProps> = [{}]
    if (raw) data = JSON.parse(raw).city
    return data.find(row => row.name == name)
}

export const getCityById = (id = 0) => {
    let raw = localStorage.getItem("@App")
    let data: Array<cityProps> = [{}]
    if (raw) data = JSON.parse(raw).city
    return data.find(row => row.id == id)
}

export const getTownship = () => {
    let raw = localStorage.getItem("@App")
    let data: Array<townshipProps> = [{}]
    if (raw) data = JSON.parse(raw).township
    return data
}

export const getTownshipByCityCode = (code: string) => {
    let raw = localStorage.getItem("@App")
    let data: Array<townshipProps> = [{}]
    if (raw) data = JSON.parse(raw).township
    return data.find(row => row.code == code)
}

export const getTownshipByCityId = (id = -1) => {
    let raw = localStorage.getItem("@App")
    let data: Array<townshipProps> = [{}]
    if (raw) data = JSON.parse(raw).township
    return data.filter(row => row.city_id == id)
}

export const getTownshipByName = (name = "") => {
    let raw = localStorage.getItem("@App")
    let data: Array<townshipProps> = [{}]
    if (raw) data = JSON.parse(raw).township
    //return data.find(row => row.name.split(" ")[1] == name)
    //return data.find(row => row.name.includes(name))
    return data.find(row => row.name.substring(4) == name)
}


export const getTownshipByTownshipId = (townshipId = -1) => {
    let raw = localStorage.getItem("@App")
    let data: Array<townshipProps> = [{}]
    if (raw) data = JSON.parse(raw).township
    return data.find(row => row.id == townshipId)
}
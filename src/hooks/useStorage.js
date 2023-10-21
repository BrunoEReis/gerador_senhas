import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    // Buscar os intens salvos
    const getItem = async (key) => {
        try{
            const password = await AsyncStorage.getItem(key);
            return JSON.parse(password) || [];

        }catch(error){
            console.log("ERRO AO BUSCAR ", error)
            return [];
        }
    }


    // Salvar um item no storage
    const saveItem = async (key, value) => {
        try{
            let passwords = await getItem(key);

            passwords.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(passwords))
        

        }catch(error){
            console.log("ERRO AO SALVAR ", error)
        }
    }

    // Remover algo do storage
    const removeItem = async (key, item) => {
        try{
            let passwords = await getItem(key);

            let myPasswords = passwords.filter( (password)=>{
                return (password !== item)
            })

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))

            return myPasswords;

        }catch(error){
            console.log("ERRO AO DELETAR ", error)
            return [];
        }
    }


    return{
        getItem,
        saveItem,
        removeItem,
    }
}


export default useStorage;
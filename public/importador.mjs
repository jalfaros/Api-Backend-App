class Importer {

    functionsList = {};

    importer = async(...rest) =>{

        if (rest.length === 0 ) return this.functionsList;
        let newList = [];

        
        Object.keys(rest[0]).forEach( (key) => {
            newList.push({id: rest[0][key], name: key });
        });
        
        for (let i = 0; i < newList.length; i++) {
            
            await this.#theFecth(newList[i].id, newList[i].name);
            
        }

        return this.functionsList;
    }

    #theFecth = async( id, rename ) => {

        const response = await fetch(`http://localhost:8080/api/function/exportFunction?idFunction=${id}`);

        let data = await response.json();
        
        let newFunction = new Function( `return ${data[0].FunctionCode}` )();
        
        this.functionsList[rename] = newFunction;
        
    }
}

export default Importer;
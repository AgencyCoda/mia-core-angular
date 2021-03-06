export class MiaQuery {
    pageCurrent = 1;
    lastPage = 1;
    itemPerPage = 50;

    filters: {[k: string]: any} = {};
    wheres: Array<any> = [];
    joins: Array<{ table: string, column: string, relation: string }> = [];

    withs: Array<string> = [];

    search = '';

    ordType = { title: '', asc: 1 };

    addJoin(table: string, column: string, relation: string) {
        this.joins.push({
            table: table,
            column: column,
            relation: relation
        });
    }

    removeJoin(index: number) {
        this.joins.splice(index, 1);
    }

    resetJoins() {
        this.joins = [];
    }
    /**
     * 
     * @param key 
     * @param value 
     */
    addWhereDate(key: string, value: string) {
        this.wheres.push({
            type: 'date',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllDate() {
        this.removeWhereByType('date');
    }
    /**
     * 
     * @param key 
     * @param value 2020-01-01
     */
     addWhereWeek(key: string, value: string) {
        this.wheres.push({
            type: 'week',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllWeek() {
        this.removeWhereByType('week');
    }
    /**
     * 
     * @param key 
     * @param value 
     */
     addWhereMonth(key: string, value: string) {
        this.wheres.push({
            type: 'month',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllMonth() {
        this.removeWhereByType('month');
    }
    /**
     * 
     * @param key 
     * @param value 
     */
     addWhereYear(key: string, value: string) {
        this.wheres.push({
            type: 'year',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllYear() {
        this.removeWhereByType('year');
    }
    /**
     * 
     * @param key 
     * @param from 
     * @param to 
     */
    addWhereBetween(key: string, from: any, to: any) {
        this.wheres.push({
            type: 'between',
            key: key,
            from: from,
            to: to,
        })
    }
    /**
     * Remove all where by type between
     */
    removeWhereAllBetween() {
        this.removeWhereByType('between');
    }
    /**
     * Remove all where by type
     * @param type 
     */
    removeWhereByType(type: string) {
        this.wheres = this.wheres.filter(i => i.type != type);
    }



    addWhere(key: string, value: any) {
        this.filters[key] = value;
    }

    addwhereIn(key: string, values: any) {
        this.filters[key + ':in'] = values;
    }

    addwhereNotIn(key: string, values: Array<any>) {
        this.filters[key + ':notin'] = values;
    }

    /**
     * @deprecated
     * @param key 
     * @param value 
     */
    addwhereLike(key: string, value: any) {
        this.addWhereLike(key, value);
    }

    addWhereLike(key: string, value: any) {
        this.filters[key + ':like'] = value;
    }

    addWhereLikes(keys: Array<string>, value: any) {
        this.wheres.push({
            type: 'likes',
            keys: keys,
            value: value
        })
    }

    /**
     * @deprecated
     * @param key 
     * @param from 
     * @param to 
     */
    addwhereBetween(key: string, from: string, to: string) {
        this.addWhereBetween(key, from, to);
    }

    removeWhere(key: string) {
        // Remove property
        delete this.filters[key];
        // Remove Where in new Structure
        let removes = [];
        for (const where of this.wheres) {
            if(where.key == key){
                removes.push(where);
            }
        }

        for (const rem of removes) {
            let index = this.wheres.indexOf(rem);
            if(index != -1){
                this.wheres.splice(index, 1);
            }
        }
    }

    getWhere(): string {
        let result = '';
        let isFirst = true;
        // tslint:disable-next-line:forin
        for (const key in this.filters) {
            const value = this.filters[key];
            if (!isFirst) {
                result += ';';
            }
            result += key + ':' + value;
            isFirst = false;
        }
        return result;
    }

    resetWhere() {
        this.filters = [];
    }

    addWith(name: string) {
        this.withs.push(name);
    }

    removeWith(name: string) {
        let index = this.withs.indexOf(name);
        if (index != -1) {
            this.withs.splice(index, 1);
        }
    }

    resetWith() {
        this.withs = [];
    }

    setPagination(lastPage: number, itemPerPage: number) {
        // Guardamos ultima pagina
        this.lastPage = lastPage;
        this.itemPerPage = itemPerPage;
    }

    toParams() {
        return {
            page: this.pageCurrent,
            where: this.getWhere(),
            wheres: this.wheres,
            joins: this.joins,
            withs: this.withs,
            search: this.search,
            ord: this.ordType.title,
            asc: this.ordType.asc,
            limit: this.itemPerPage
        };
    }
}

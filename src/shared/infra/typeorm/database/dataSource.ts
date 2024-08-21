import { DataSource, DataSourceOptions } from "typeorm";
import ORMconfig from '../../../../../ormconfig';

const dataSourceOptions: DataSourceOptions = ORMconfig as DataSourceOptions;

export const dataBaseConnection = new DataSource(dataSourceOptions);


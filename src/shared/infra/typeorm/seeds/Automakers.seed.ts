import { DataSource } from 'typeorm'
import { Automaker } from '../entities/Automaker'

export default async (connection: DataSource) => {
    const automakerRepository = connection.getRepository(Automaker)

    const automakers = [
        'Toyota',
        'Volkswagen',
        'Mercedes-Benz',
        'Ford',
        'Honda',
        'BMW',
        'Nissan',
        'Hyundai',
        'Chevrolet',
        'Kia',
        'Audi',
        'Renault',
        'Peugeot',
        'Fiat',
        'Mazda',
        'Subaru',
        'Mitsubishi',
        'Land Rover',
        'Jaguar',
        'Porsche',
        'Tesla',
        'Volvo',
        'Lexus',
        'Ferrari',
        'Lamborghini',
        'Bentley',
        'Bugatti',
        'Aston Martin',
        'Rolls-Royce',
        'Chrysler',
        'Jeep',
        'Dodge',
        'Ram',
        'Alfa Romeo',
        'Maserati',
        'Citroën',
        'Suzuki',
        'Genesis',
        'Infiniti',
        'Acura',
        'Lincoln',
        'Cadillac',
        'Opel',
        'Skoda',
        'Seat',
        'Saab',
        'Hummer',
        'Isuzu',
        'Daihatsu',
        'Lancia',
        'Great Wall',
        'BYD',
        'Chery',
        'Geely',
        'Tata Motors',
        'Mahindra',
        'Zotye',
        'MG Motor',
        'Rivian',
        'Lucid Motors',
        'Polestar',
    ]

    for (const automaker of automakers) {
        const existingAutomaker = await automakerRepository.findOne({
            where: { description: automaker },
        })

        if (!existingAutomaker) {
            await automakerRepository.save({ description: automaker })
        }
    }
}

import { DataSource } from 'typeorm'
import { GroupUser } from '../entities/GroupUsers'

export default async (connection: DataSource) => {
    const groupRepository = connection.getRepository(GroupUser)

    const groups = [
        { id: 1, description: 'Admin' },
        { id: 2, description: 'employee' },
        { id: 3, description: 'user' },
    ]

    for (const group of groups) {
        const existingGroup = await groupRepository.findOne({
            where: { description: group.description },
        })

        if (!existingGroup) {
            await groupRepository.save(group)
        }
    }
}

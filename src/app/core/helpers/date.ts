export function formatDate(isoDate: string): string {
    const date = new Date(isoDate)

    return new Intl.DateTimeFormat('pt-BR').format(date)
}
// Catálogo Brafilm — capas TMDB (verificadas)
const p = (path) => `https://image.tmdb.org/t/p/w500${path}`
const bd = (path) => `https://image.tmdb.org/t/p/original${path}`

const filme = (item) => ({ ...item, contentType: 'filme', tagline: 'Filmes Online HD' })
const serie = (item) => ({ ...item, contentType: 'serie', tagline: 'Séries Online HD' })

export const featured = {
  id: 'berlim',
  title: 'Berlim e a Dama com Arminho',
  subtitle: 'LA CASA DE PAPEL',
  logoText: 'BERLIM',
  logoSuffix: 'E A DAMA COM ARMINHO',
  logoImage: p('/yaSolQdphRLOUWvtBvtYF4tNEO7.png'),
  rating: 10.0,
  year: 2026,
  type: 'Série',
  description:
    'Sevilha é um belo lugar para um roubo sem igual. De olho em uma obra de arte valiosa, Berlim convoca sua gangue para planejar um crime explosivo.',
  backdrop: bd('/ntPgSYKwPg9xKO4VvLJYfInSyZa.jpg'),
  poster: p('/vfIDUV6xpZmbbyYNs4L3MjkPu3E.jpg'),
  slug: 'berlim-e-a-dama-com-arminho',
  contentType: 'serie',
}

export const lancamentos = [
  filme({ id: 1, title: 'Colisão: Acidente ou Homicídio?', rating: 6.0, year: 2026, poster: p('/94AQpf6Rg6tblNpa65ogzYw4q6P.jpg'), slug: 'colisao-acidente-ou-homicidio' }),
  filme({ id: 2, title: 'Kartavya', rating: 0.0, year: 2026, poster: p('/9VQvX7a05FgDKAiSGg71MHTXsyF.jpg'), slug: 'kartavya' }),
  filme({ id: 3, title: 'A Noiva do Ano', rating: 0.0, year: 2026, poster: p('/2AiO7wnTrY5ktq0pLco3eS6g8NL.jpg'), slug: 'a-noiva-do-ano' }),
  filme({ id: 4, title: 'Ilusão Macabra', rating: 5.9, year: 2026, poster: p('/fWsWD1IIYtZFvKmOBMZKGUYyXeA.jpg'), slug: 'ilusao-macabra' }),
  filme({ id: 5, title: 'Vingadora', rating: 6.4, year: 2026, poster: p('/l4WzNZC5o9KXnps4smVt45v1nYX.jpg'), slug: 'vingadora' }),
  filme({ id: 6, title: 'O Justiceiro: Uma Última Morte', rating: 9.0, year: 2026, poster: p('/9vSRY9SVYiC0Ms32L6iftaKYyxT.jpg'), slug: 'o-justiceiro-uma-ultima-morte' }),
  filme({ id: 7, title: 'Eu & Você na Toscana', rating: 4.9, year: 2026, poster: p('/i21UWr8sC65vN0Q8EY7H6PjTpv5.jpg'), slug: 'eu-voce-na-toscana' }),
  filme({ id: 8, title: 'Martin Short: Uma Vida de Comédia', rating: 0.0, year: 2026, poster: p('/udQ4UWZaaN5s46jVHTBmEkWVpst.jpg'), slug: 'martin-short-uma-vida-de-comedia' }),
  filme({ id: 9, title: 'Emilia Pérez', rating: 6.5, year: 2024, poster: p('/r97rxknoUQxXaOfC6eo0DLKRBvL.jpg'), slug: 'emilia-perez' }),
  filme({ id: 10, title: 'Ditto: Conexões do Amor', rating: 6.8, year: 2022, poster: p('/f1i6kynpQDXcXxyZU5fpG9AwbKz.jpg'), slug: 'ditto-conexoes-do-amor' }),
  filme({ id: 11, title: '13 Dias, 13 Noites', rating: 6.7, year: 2025, poster: p('/FKoZ8hkkR1FqRjP8IYz3Xgps3b.jpg'), slug: '13-dias-13-noites' }),
  filme({ id: 12, title: 'O Astronauta', rating: 6.7, year: 2024, poster: p('/eESjSke7I1UtVs875my9F6xeKk9.jpg'), slug: 'o-astronauta' }),
  filme({ id: 13, title: 'Encontrando um Amor no Natal', rating: 2.3, year: 2023, poster: p('/1xdwfLPxNZxdGOygkblqosCQVAl.jpg'), slug: 'encontrando-um-amor-no-natal' }),
  filme({ id: 14, title: 'O Preço da Violência', rating: 7.2, year: 2025, poster: p('/mU9kqIHmmxLo4zwkkJwurdqSOV6.jpg'), slug: 'o-preco-da-violencia' }),
  filme({ id: 15, title: 'Marco: Justiça Implacável', rating: 6.5, year: 2024, poster: p('/i6UUwEGt7aLokTjdcTt1xlh0Aul.jpg'), slug: 'marco-justica-implacavel' }),
  filme({ id: 16, title: 'Devoradores de Estrelas', rating: 8.2, year: 2026, poster: p('/bOzG3SG6gBxHGGHYiq7xXeNb1bG.jpg'), slug: 'devoradores-de-estrelas' }),
  filme({ id: 17, title: 'Moana 2', rating: 7.0, year: 2024, poster: p('/3C9jcjZSwRVDk83VgBK7WU5qVQ8.jpg'), slug: 'moana-2' }),
  filme({ id: 18, title: 'Anora', rating: 7.4, year: 2024, poster: p('/zdJP1EvyL6G58NIQJj0n5T2l7u7.jpg'), slug: 'anora' }),
  filme({ id: 19, title: 'Mufasa: O Rei Leão', rating: 6.8, year: 2024, poster: p('/9kNoxoZqpriNLh9OSECyBZc3DZW.jpg'), slug: 'mufasa-o-rei-leao' }),
  filme({ id: 20, title: 'Gladiador II', rating: 6.5, year: 2024, poster: p('/dARTCpnHY0R0B28j5q5ynq7erua.jpg'), slug: 'gladiador-ii' }),
]

export const populares = [
  filme({ id: 301, title: 'O Mistério da Casa do Lago', rating: 7.0, year: 2022, poster: p('/pvljuudKCx99ILd4fFAgU5tXv8U.jpg'), slug: 'o-misterio-da-casa-do-lago' }),
  filme({ id: 302, title: 'Imortais', rating: 6.0, year: 2025, poster: p('/lsn9IR64RyO83GvIDnfROJ2O4LL.jpg'), slug: 'imortais' }),
  filme({ id: 303, title: 'Garota Desconhecida', rating: 5.1, year: 2023, poster: p('/gCzBuPXsj8UUwqKJ3Q4IntzujCV.jpg'), slug: 'garota-desconhecida' }),
  filme({ id: 304, title: 'Três Sogras e Um Plano', rating: 7.2, year: 2024, poster: p('/3Vqz9ZHlaXZ8zwp1tzdtY2XKmJu.jpg'), slug: 'tres-sogras-e-um-plano' }),
  filme({ id: 305, title: 'Um Pesadelo De Vizinha', rating: 7.3, year: 2020, poster: p('/udZ8rxk05kLiIvtjt9y18zcXabD.jpg'), slug: 'um-pesadelo-de-vizinha' }),
  filme({ id: 306, title: 'Festa do Pijama Muito Louca', rating: 6.7, year: 2023, poster: p('/1i7dglSbXeDUJrGd4rKGhLKzqGJ.jpg'), slug: 'festa-do-pijama-muito-louca' }),
  filme({ id: 307, title: 'Só no Sertão', rating: 7.0, year: 2024, poster: p('/bZDZT5aHYbTR6dk5KWze3PdVGCv.jpg'), slug: 'so-no-sertao' }),
  filme({ id: 308, title: 'Escolhas do Coração', rating: 5.7, year: 2022, poster: p('/5t7Sn37rB23ZbQ13MmIBmxsB4A9.jpg'), slug: 'escolhas-do-coracao' }),
  filme({ id: 309, title: 'Meu Nome é Gal', rating: 6.7, year: 2023, poster: p('/zWKWDxF2oCYvl7PoShG253oIp27.jpg'), slug: 'meu-nome-e-gal' }),
  filme({ id: 310, title: '3 Corações', rating: 5.5, year: 2014, poster: p('/13vkyx0RU8Pikdaow8Yjsb8J9aL.jpg'), slug: '3-coracoes' }),
  filme({ id: 311, title: 'A Última Fagulha de Esperança', rating: 6.0, year: 2023, poster: p('/3DsigoWxV0S0z31OzNG6L42q4aj.jpg'), slug: 'a-ultima-fagulha-de-esperanca' }),
  filme({ id: 312, title: 'Super Mario Galaxy: O Filme', rating: 6.7, year: 2026, poster: p('/b3WeTp42eJSRuE4UZfyPCOJW4c.jpg'), slug: 'super-mario-galaxy-o-filme' }),
  filme({ id: 313, title: 'Deadpool & Wolverine', rating: 7.6, year: 2024, poster: p('/fVr2X3jnoeLuZ2v0L1O8MOdOiSz.jpg'), slug: 'deadpool-wolverine' }),
  filme({ id: 314, title: 'Duna: Parte Dois', rating: 8.1, year: 2024, poster: p('/tihf8Trht9zP3scmUQfvGlAY9FU.jpg'), slug: 'duna-parte-dois' }),
  filme({ id: 315, title: 'Divertida Mente 2', rating: 7.6, year: 2024, poster: p('/xYqeUheNCep7ll9AotOcclGhP0X.jpg'), slug: 'divertida-mente-2' }),
  filme({ id: 316, title: 'Alien: Romulus', rating: 7.2, year: 2024, poster: p('/6XaSb6bHdopC7XeSO0aOzPlvi41.jpg'), slug: 'alien-romulus' }),
  filme({ id: 317, title: 'Wicked', rating: 7.0, year: 2024, poster: p('/qaqQqYRjK3djrOZAeKQBdVFtQqh.jpg'), slug: 'wicked' }),
  filme({ id: 318, title: 'Nosferatu', rating: 7.2, year: 2024, poster: p('/oHmwlW121vqSPvD27sRTRco1Vz6.jpg'), slug: 'nosferatu' }),
  filme({ id: 319, title: 'A Substância', rating: 7.2, year: 2024, poster: p('/rNrBHeqnDA8aHIz9eYkBskcKhq7.jpg'), slug: 'a-substancia' }),
  filme({ id: 320, title: 'Venom: A Última Rodada', rating: 6.4, year: 2024, poster: p('/zXuJod6c9NyPwHJiT3HxsZDquLZ.jpg'), slug: 'venom-a-ultima-rodada' }),
  filme({ id: 321, title: 'Beetlejuice Beetlejuice', rating: 6.9, year: 2024, poster: p('/gzU2cRkxoAX29jHLqiIvlByvZIQ.jpg'), slug: 'beetlejuice-beetlejuice' }),
  filme({ id: 322, title: 'Sorria 2', rating: 6.7, year: 2024, poster: p('/eJ0KIFewo6jw51f2Dy0iujEXmqd.jpg'), slug: 'sorria-2' }),
]

export const seriesEmAlta = [
  serie({ id: 101, title: 'Os SUPERtontos', rating: 0.0, year: 2026, poster: p('/fwfRrSph94aPeB1pE3MF5UWuftZ.jpg'), slug: 'os-supertontos' }),
  serie({ id: 102, title: 'Berlim e a Dama com Arminho', rating: 10.0, year: 2026, poster: p('/vfIDUV6xpZmbbyYNs4L3MjkPu3E.jpg'), slug: 'berlim-e-a-dama-com-arminho' }),
  serie({ id: 103, title: 'Pela Metade', rating: 8.3, year: 2026, poster: p('/j6TXud3kXLyqZrPyVwtkIVs8mXd.jpg'), slug: 'pela-metade' }),
  serie({ id: 104, title: 'Territórios - Sob o Domínio do Crime', rating: 0.0, year: 2026, poster: p('/r4ClDl5sYE65HBf5r87bNLjyzzH.jpg'), slug: 'territorios-sob-o-dominio-do-crime' }),
  serie({ id: 105, title: 'Homem em Chamas', rating: 5.8, year: 2026, poster: p('/nIyQtwmxmry2xFVPpKOJRAdBnXM.jpg'), slug: 'homem-em-chamas' }),
  serie({ id: 106, title: 'Se Desejos Matassem...', rating: 7.9, year: 2026, poster: p('/l7Yqgal5v7qa7DTfPpsLTYlehXc.jpg'), slug: 'se-desejos-matassem' }),
  serie({ id: 107, title: 'A Casa dos Espíritos', rating: 8.7, year: 2026, poster: p('/lzy5lANYtUp24VTnX0NnnwAnvJa.jpg'), slug: 'a-casa-dos-espiritos' }),
  serie({ id: 108, title: 'Stranger Things: Histórias de 85', rating: 6.5, year: 2026, poster: p('/zUdykEDaQrjGKnVnAAcua3kNiAG.jpg'), slug: 'stranger-things-historias-de-85' }),
  serie({ id: 109, title: 'The Boys', rating: 8.5, year: 2019, poster: p('/in1R2dDc421JxsoRWaIIAqVI2KE.jpg'), slug: 'the-boys' }),
  serie({ id: 110, title: 'Outlander', rating: 8.2, year: 2014, poster: p('/bxBmfyzK0ARF9hqf2pbFWsddH14.jpg'), slug: 'outlander' }),
  serie({ id: 111, title: 'La Casa de Papel', rating: 8.2, year: 2021, poster: p('/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg'), slug: 'la-casa-de-papel' }),
  serie({ id: 112, title: 'Round 6', rating: 7.9, year: 2021, poster: p('/6gcHdboppvplmBWxvROc96NJnmm.jpg'), slug: 'round-6' }),
  serie({ id: 113, title: 'Wednesday', rating: 8.5, year: 2022, poster: p('/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg'), slug: 'wednesday' }),
  serie({ id: 114, title: 'The Last of Us', rating: 8.6, year: 2023, poster: p('/cdbDsn2hqLL7x804GixzPP8AiBE.jpg'), slug: 'the-last-of-us' }),
  serie({ id: 115, title: 'Fallout', rating: 8.3, year: 2024, poster: p('/c15BtJxCXMrISLVmysdsnZUPQft.jpg'), slug: 'fallout' }),
  serie({ id: 116, title: 'Loki', rating: 8.2, year: 2021, poster: p('/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg'), slug: 'loki' }),
  serie({ id: 117, title: 'Cobra Kai', rating: 8.2, year: 2018, poster: p('/6POBWybSBDBKjSs1VAQcnQC1qyt.jpg'), slug: 'cobra-kai' }),
  serie({ id: 118, title: 'Breaking Bad', rating: 9.5, year: 2008, poster: p('/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg'), slug: 'breaking-bad' }),
  serie({ id: 119, title: 'Dark', rating: 8.7, year: 2017, poster: p('/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg'), slug: 'dark' }),
]

export const emDestaque = [
  serie({ id: 201, title: 'Berlim e a Dama com Arminho', rating: 10.0, year: 2026, poster: p('/vfIDUV6xpZmbbyYNs4L3MjkPu3E.jpg'), slug: 'berlim-destaque', rank: 1 }),
  serie({ id: 202, title: 'Os SUPERtontos', rating: 0.0, year: 2026, poster: p('/fwfRrSph94aPeB1pE3MF5UWuftZ.jpg'), slug: 'supertontos-destaque', rank: 2 }),
  filme({ id: 203, title: 'O Justiceiro: Uma Última Morte', rating: 9.0, year: 2026, poster: p('/9vSRY9SVYiC0Ms32L6iftaKYyxT.jpg'), slug: 'justiceiro-destaque', rank: 3 }),
  filme({ id: 204, title: 'Devoradores de Estrelas', rating: 8.2, year: 2026, poster: p('/bOzG3SG6gBxHGGHYiq7xXeNb1bG.jpg'), slug: 'devoradores-destaque', rank: 4 }),
  serie({ id: 205, title: 'The Boys', rating: 8.5, year: 2019, poster: p('/in1R2dDc421JxsoRWaIIAqVI2KE.jpg'), slug: 'the-boys-destaque', rank: 5 }),
  filme({ id: 206, title: 'A Noiva do Ano', rating: 0.0, year: 2026, poster: p('/2AiO7wnTrY5ktq0pLco3eS6g8NL.jpg'), slug: 'noiva-destaque', rank: 6 }),
  filme({ id: 207, title: 'Super Mario Galaxy: O Filme', rating: 6.7, year: 2026, poster: p('/b3WeTp42eJSRuE4UZfyPCOJW4c.jpg'), slug: 'super-mario-destaque', rank: 7 }),
  filme({ id: 208, title: 'Criaturas Extraordinariamente Brilhantes', rating: 0.0, year: 2026, poster: p('/iMJaRPY4xx4lScIaIWd67yWJuqc.jpg'), slug: 'criaturas-brilhantes', rank: 8 }),
  filme({ id: 209, title: 'Como Mágica', rating: 0.0, year: 2026, poster: p('/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg'), slug: 'como-magica', rank: 9 }),
  serie({ id: 210, title: 'Outlander', rating: 8.2, year: 2014, poster: p('/bxBmfyzK0ARF9hqf2pbFWsddH14.jpg'), slug: 'outlander-destaque', rank: 10 }),
]

export const allFilmes = [...lancamentos, ...populares]
export const allSeries = [...seriesEmAlta]

export function findBySlug(slug) {
  const all = [featured, ...lancamentos, ...populares, ...seriesEmAlta, ...emDestaque]
  return all.find((item) => item.slug === slug) || null
}

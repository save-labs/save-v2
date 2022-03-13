import React from 'react';

import { SubjectRegular, SubjectMedium } from './styles';

interface SituationProps {
  situacao: string;
  segundo_semestre: boolean;
  quantidade_avaliacoes: number;
  nota_avaliacao_final: {
    nota: number;
  };
  nota_etapa_1: {
    nota: number;
  };
  nota_etapa_2: {
    nota: number;
  };
  nota_etapa_3: {
    nota: number;
  };
  nota_etapa_4: {
    nota: number;
  };
}

function calc({
  situacao,
  segundo_semestre,
  quantidade_avaliacoes,
  nota_avaliacao_final,
  nota_etapa_1,
  nota_etapa_2,
  nota_etapa_3,
  nota_etapa_4,
}: SituationProps) {
  if (situacao === 'Aprovado') {
    return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;
  }
  if (quantidade_avaliacoes === 2) {
    const notaFinal = (nota_etapa_1.nota * 2 + nota_etapa_2.nota * 3) / 5;

    if (nota_etapa_1.nota !== null && nota_etapa_2.nota !== null) {
      if (notaFinal >= 60) return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;

      if (notaFinal >= 20) {
        const nM1 = 100 - (2 * nota_etapa_1.nota) / 3;
        const nM2 = 150 - (3 * nota_etapa_2.nota) / 2;

        const needed = Math.floor(Math.min(nM1, nM2));

        if (nota_avaliacao_final.nota) {
          if (nota_avaliacao_final.nota >= needed) {
            return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;
          }
          return <SubjectRegular>Você está <SubjectMedium>Reprovado</SubjectMedium>.</SubjectRegular>;
        }
        return (
          <SubjectRegular>
            Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos na Prova Final
            para sua aprovação nesta matéria.
          </SubjectRegular>
        );
      }

      return <SubjectRegular>Você está <SubjectMedium>Reprovado</SubjectMedium>.</SubjectRegular>;
    }
    if (nota_etapa_1.nota !== null && !segundo_semestre) {
      const needed = Math.ceil((300 - 2 * nota_etapa_1.nota) / 3);

      return (
        <SubjectRegular>
          Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos no 2° BI para sua
          aprovação nesta matéria.
        </SubjectRegular>
      );
    }
    if (nota_etapa_1.nota !== null && segundo_semestre) {
      const needed = Math.ceil((300 - 2 * nota_etapa_1.nota) / 3);

      return (
        <SubjectRegular>
          Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos no 4° BI para sua
          aprovação nesta matéria.
        </SubjectRegular>
      );
    }
  }

  const notaFinal =
    (nota_etapa_1.nota * 2 +
      nota_etapa_2.nota * 2 +
      nota_etapa_3.nota * 3 +
      nota_etapa_4.nota * 3) /
    10;

  if (notaFinal > 60) {
    return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;
  }

  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota !== null &&
    nota_etapa_4.nota !== null
  ) {
    if (notaFinal > 150) return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;
    if (notaFinal >= 20) {
      const nM1 =
        300 -
        nota_etapa_1.nota -
        (3 * nota_etapa_3.nota) / 2 -
        (3 * nota_etapa_4.nota) / 2;
      const nM2 =
        300 -
        nota_etapa_1.nota -
        (3 * nota_etapa_3.nota) / 2 -
        (3 * nota_etapa_4.nota) / 2;
      const nM3 =
        200 -
        nota_etapa_4.nota -
        (2 * nota_etapa_1.nota) / 3 -
        (2 * nota_etapa_2.nota) / 3;
      const nM4 =
        200 -
        nota_etapa_3.nota -
        (2 * nota_etapa_1.nota) / 3 -
        (2 * nota_etapa_2.nota) / 3;

      const needed = Math.ceil(Math.min(nM1, nM2, nM3, nM4));
      if (nota_avaliacao_final.nota) {
        if (nota_avaliacao_final.nota >= needed) {
          return <SubjectRegular>Você está <SubjectMedium>Aprovado</SubjectMedium>.</SubjectRegular>;
        }
        return <SubjectRegular>Você está <SubjectMedium>Reprovado</SubjectMedium>.</SubjectRegular>;
      }
      return (
        <SubjectRegular>
          Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos na Prova Final para
          sua aprovação nesta matéria.
        </SubjectRegular>
      );
    }
    return <SubjectRegular>Você está <SubjectMedium>Reprovado</SubjectMedium></SubjectRegular>;
  }
  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota === null &&
    nota_etapa_4.nota === null
  ) {
    const needed = Math.ceil(
      (600 - (nota_etapa_1.nota * 2 + nota_etapa_2.nota * 2)) / 3,
    );

    if (needed <= 100) {
      return (
        <SubjectRegular>
          Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos no 3° BI para sua
          aprovação nesta matéria.
        </SubjectRegular>
      );
    }

    return (
      <SubjectRegular>
        Conquiste <SubjectMedium>104</SubjectMedium> pontos nos próximos bimestres
        para sua aprovação nesta matéria.
      </SubjectRegular>
    );
  }
  if (
    nota_etapa_1.nota !== null &&
    nota_etapa_2.nota !== null &&
    nota_etapa_3.nota !== null &&
    nota_etapa_4.nota === null
  ) {
    const needed = Math.ceil(
      (600 -
        (nota_etapa_1.nota * 2 +
          nota_etapa_2.nota * 2 +
          nota_etapa_3.nota * 3)) /
      3,
    );

    return (
      <SubjectRegular>
        Conquiste <SubjectMedium>{needed}</SubjectMedium> pontos no 4° BI para sua
        aprovação nesta matéria.
      </SubjectRegular>
    );
  }

  return <SubjectRegular>Cursando.</SubjectRegular>;
}

export const AcademicSituation: React.FC<SituationProps> = ({
  situacao,
  segundo_semestre,
  quantidade_avaliacoes,
  nota_avaliacao_final,
  nota_etapa_1,
  nota_etapa_2,
  nota_etapa_3,
  nota_etapa_4,
}) => {
  return calc({
    situacao,
    segundo_semestre,
    quantidade_avaliacoes,
    nota_avaliacao_final,
    nota_etapa_1,
    nota_etapa_2,
    nota_etapa_3,
    nota_etapa_4,
  });
};


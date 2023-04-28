import { forwardRef } from 'react'

import {
  ButtonFrame,
  ButtonProps as TamaguiButtonProps,
  ButtonText,
  GetProps,
  styled,
  TamaguiElement,
  themeable,
  useButton,
} from 'tamagui'

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum ButtonEmphasis {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Detrimental = 'detrimental',
  Warning = 'warning',
}

const CustomButtonFrame = styled(ButtonFrame, {
  name: 'Button',
  tag: 'button',
  // instead of setting border: 0 when no border, make it 1px but transparent, so the
  // size or alignment of a button won't change unexpectedly between variants
  borderWidth: 1,

  variants: {
    buttonSize: {
      [ButtonSize.Small]: {
        padding: '$spacing8',
        borderRadius: '$rounded8',
      },
      [ButtonSize.Medium]: {
        padding: '$spacing12',
        borderRadius: '$rounded16',
      },
      [ButtonSize.Large]: {
        padding: '$spacing16',
        borderRadius: '$rounded20',
      },
    },
    buttonEmphasis: {
      [ButtonEmphasis.Primary]: {
        backgroundColor: '$magentaVibrant',
        borderColor: '$none',
      },
      [ButtonEmphasis.Secondary]: {
        backgroundColor: '$background3',
        borderColor: '$none',
      },
      [ButtonEmphasis.Tertiary]: {
        backgroundColor: '$none',
        borderColor: '$backgroundOutline',
      },
      [ButtonEmphasis.Detrimental]: {
        backgroundColor: '$accentCriticalSoft',
        borderColor: '$none',
      },
      [ButtonEmphasis.Warning]: {
        backgroundColor: '$accentWarningSoft',
        borderColor: '$none',
      },
    },
  } as const,

  defaultVariants: {
    buttonSize: ButtonSize.Medium,
    buttonEmphasis: ButtonEmphasis.Primary,
  },
})

const CustomButtonText = styled(ButtonText, {
  variants: {
    buttonEmphasis: {
      [ButtonEmphasis.Primary]: {
        color: '$white',
        fontFamily: '$body',
      },
      [ButtonEmphasis.Secondary]: {
        color: '$textPrimary',
        fontFamily: '$body',
      },
      [ButtonEmphasis.Tertiary]: {
        color: '$textPrimary',
        fontFamily: '$body',
      },
      [ButtonEmphasis.Detrimental]: {
        color: '$accentCritical',
        fontFamily: '$body',
      },
      [ButtonEmphasis.Warning]: {
        color: '$accentWarning',
        fontFamily: '$body',
      },
    },
  } as const,

  defaultVariants: {
    buttonSize: ButtonSize.Medium,
    buttonEmphasis: ButtonEmphasis.Primary,
  },
})

type CustomButtonProps = GetProps<typeof CustomButtonFrame>

type CustomButtonTextProps = GetProps<typeof CustomButtonText>

export type ButtonProps = TamaguiButtonProps &
  CustomButtonProps &
  CustomButtonTextProps

export const Button = themeable(
  forwardRef<TamaguiElement, ButtonProps>((propsIn, ref) => {
    const { props } = useButton(propsIn, { Text: CustomButtonText })
    return <CustomButtonFrame {...props} ref={ref} role="button" />
  })
)
import { ImpactFeedbackStyle } from 'expo-haptics'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useAppTheme } from 'src/app/hooks'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { Chevron } from 'src/components/icons/Chevron'
import { AnimatedBox, Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'

export function HiddenTokensRow({
  numHidden,
  isExpanded,
  onPress,
}: {
  numHidden: number
  isExpanded: boolean
  onPress: () => void
}): JSX.Element {
  const theme = useAppTheme()
  const { t } = useTranslation()

  const chevronRotate = useSharedValue(isExpanded ? 180 : 0)

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${chevronRotate.value}deg` }],
    }
  })

  const onPressRow = useCallback(() => {
    chevronRotate.value = withTiming(chevronRotate.value === 0 ? 180 : 0, {
      duration: 150,
      easing: Easing.ease,
    })
    onPress()
  }, [chevronRotate, onPress])

  return (
    <TouchableArea hapticFeedback hapticStyle={ImpactFeedbackStyle.Light} onPress={onPressRow}>
      <Flex row alignItems="center" justifyContent="space-between" mt="xs">
        <Text color="textPrimary" variant="subheadSmall">
          {t('Hidden ({{numHidden}})', { numHidden })}
        </Text>
        <AnimatedBox style={chevronAnimatedStyle}>
          <Chevron color={theme.colors.textPrimary} direction="s" />
        </AnimatedBox>
      </Flex>
    </TouchableArea>
  )
}

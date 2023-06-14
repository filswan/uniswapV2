import { default as React } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from 'src/app/hooks'
import { NetworkLogo } from 'src/components/CurrencyLogo/NetworkLogo'
import { Flex } from 'src/components/layout'
import { Separator } from 'src/components/layout/Separator'
import { Text } from 'src/components/Text'
import Check from 'ui/assets/icons/check.svg'
import { iconSizes } from 'ui/theme/iconSizes'
import { ChainId, CHAIN_INFO } from 'wallet/src/constants/chains'

const NETWORK_OPTION_ICON_SIZE = iconSizes.icon24

export function NetworkOption({
  chainId,
  currentlySelected,
}: {
  chainId: ChainId | null
  currentlySelected?: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const info = chainId && CHAIN_INFO[chainId]
  const theme = useAppTheme()
  return (
    <>
      <Separator />
      <Flex row alignItems="center" justifyContent="space-between" px="spacing24" py="spacing16">
        <Text color="textPrimary" variant="bodyLarge">
          {info?.label ?? t('All networks')}
        </Text>
        <Flex centered height={NETWORK_OPTION_ICON_SIZE} width={NETWORK_OPTION_ICON_SIZE}>
          {currentlySelected ? (
            <Check
              color={theme.colors.textPrimary}
              height={iconSizes.icon20}
              width={iconSizes.icon20}
            />
          ) : (
            chainId && <NetworkLogo chainId={chainId} size={NETWORK_OPTION_ICON_SIZE} />
          )}
        </Flex>
      </Flex>
    </>
  )
}

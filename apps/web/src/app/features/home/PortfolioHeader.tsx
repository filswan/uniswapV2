import { useNavigate } from 'react-router-dom'
import { SwitchNetworksModal } from 'src/app/features/home/SwitchNetworksModal'
import { AppRoutes } from 'src/app/navigation/constants'
import { Popover, XStack } from 'ui'
import GlobeIcon from 'ui/assets/icons/globe.svg'
import SettingsIcon from 'ui/assets/icons/settings.svg'
import { LinkButton } from 'ui/components/button/Button'
import { Chevron } from 'ui/components/icons/Chevron'
import { Flex } from 'ui/components/layout/Flex'
import { Text } from 'ui/components/text/Text'
import { Unicon } from 'ui/components/Unicon'
import { colorsDark } from 'ui/theme/color'
import { iconSizes } from 'ui/theme/iconSizes'
import { sanitizeAddressText, shortenAddress } from 'wallet/src/utils/addresses'

type PortfolioHeaderProps = {
  address: Address
  onLockPress?: () => void
}

export function PortfolioHeader({ address }: PortfolioHeaderProps): JSX.Element {
  const navigate = useNavigate()

  const onPressAccount = (): void => {
    navigate(AppRoutes.AccountSwitcher.valueOf())
  }

  // TODO: Add dapp connection status to store to show/hide switch networks modal

  return (
    <XStack alignItems="center" justifyContent="space-between" padding="$spacing16">
      <Flex
        alignItems="center"
        flexDirection="row"
        gap="$spacing8"
        justifyContent="center"
        onPress={onPressAccount}>
        <Unicon address={address} size={iconSizes.icon36} />
        <Text variant="subheadSmall">{sanitizeAddressText(shortenAddress(address))}</Text>
        <Chevron
          color={colorsDark.textSecondary}
          direction="s"
          height={iconSizes.icon20}
          width={iconSizes.icon20}
        />
      </Flex>
      <XStack alignItems="center" gap="$spacing16" justifyContent="space-around">
        <Popover>
          <Popover.Trigger>
            <GlobeIcon
              color={colorsDark.textSecondary}
              height={iconSizes.icon24}
              width={iconSizes.icon24}
            />
          </Popover.Trigger>
          <Popover.Content borderRadius="$rounded12">
            <SwitchNetworksModal />
          </Popover.Content>
        </Popover>
        <LinkButton
          icon={
            <SettingsIcon
              color={colorsDark.textSecondary}
              height={iconSizes.icon24}
              width={iconSizes.icon24}
            />
          }
          padding={0}
          to="/settings"
        />
      </XStack>
    </XStack>
  )
}

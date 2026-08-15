import { Button } from '@/components/ui/button'
import { useMultiStepForm } from '../providers/multi-step-form-provider'

const PrevButton = () => {
  const { isFirstStep, previousStep } = useMultiStepForm()

  return (
    <Button
      variant='outline'
      type='button'
      className='mt-5'
      onClick={previousStep}
      disabled={isFirstStep}
    >
      Previous
    </Button>
  )
}
export default PrevButton

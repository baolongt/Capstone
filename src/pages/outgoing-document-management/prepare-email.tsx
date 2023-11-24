import 'react-quill/dist/quill.snow.css';

import { yupResolver } from '@hookform/resolvers/yup';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LoadingButton } from '@mui/lab';
import {
  Chip,
  IconButton,
  Paper,
  styled,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAddEmailTemplate } from '@/apis';
import { FieldTitle, InputField } from '@/components/common';
import EmailInput from '@/components/common/form-control/email-editor';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { prepareEmailSchema } from '@/models/validation/outgoingDocument';

const defaultTemplate =
  '<p>Kính gửi, {{name}}</p><p><br></p><p>Tôi gửi đến bạn bản hợp đồng để ký kết và thực hiện các hoạt động hợp tác giữa hai bên. Vui lòng kiểm tra kỹ nội dung hợp đồng và xác nhận lại với chúng tôi.</p><p><br></p><p>Nếu bạn có thắc mắc hoặc yêu cầu nào liên quan đến hợp đồng này, xin vui lòng liên hệ trực tiếp với chúng tôi để được giải đáp.</p><p><br></p><p>Chúng tôi mong nhận được phản hồi từ bạn sớm nhất có thể.</p><p><br></p><p>Trân trọng</p>';

const ToolTipContent = () => {
  return (
    <>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Một số từ khóa có sẵn để thêm vào nội dung email trong trường hợp nhiều
        người nhận
      </Typography>
      <Box>
        <Chip label="{{name}}" /> : Tên người nhận trong danh sách liên lạc
      </Box>
    </>
  );
};

const TextOnlyTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
color: black;
background-color: white;
font-size: 1em;
padding: 10px;
border: 1px solid black;
  `);

const PrepareEmailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      emailTemplate: defaultTemplate,
      emailSubject: ''
    },
    resolver: yupResolver(prepareEmailSchema)
  });
  const { handleSubmit, getValues } = form;

  const { mutate: addEmailTemplate, isLoading } = useAddEmailTemplate({
    onSuccess: () => {
      toast.success('Thêm email thành công');
      navigate(`/outgoing-documents/${id}`);
    },
    onError: () => {
      toast.error('Thêm email thất bại');
    },
    id: Number(id)
  });

  const submitHanler = () => {
    addEmailTemplate({
      id: Number(id),
      ...getValues()
    });
  };

  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="Chuẩn bị email" />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: '1080px',
            mt: 3,
            pt: 3,
            px: 2,
            minHeight: '80vh'
          }}
          component={Paper}
        >
          <Box component="form" onSubmit={handleSubmit(submitHanler)}>
            <Box>
              <FieldTitle
                sx={{
                  fontWeight: 'bold',
                  mb: 1
                }}
                title="Tiêu đề"
                isRequired={true}
              />
              <InputField form={form} name="emailSubject" />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex'
                }}
              >
                <FieldTitle
                  sx={{
                    pt: 1,
                    fontWeight: 'bold'
                  }}
                  title="Nội dung"
                  isRequired={true}
                />
                <TextOnlyTooltip placement="right" title={<ToolTipContent />}>
                  <IconButton sx={{ pb: 1 }} aria-label="delete">
                    <HelpOutlineIcon />
                  </IconButton>
                </TextOnlyTooltip>
              </Box>

              <EmailInput form={form} name="emailTemplate" />
            </Box>
            <Box
              sx={{
                width: '100%',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                loading={isLoading}
                onClick={() => {
                  console.log(form.getValues());
                }}
              >
                Lưu
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PrepareEmailPage;

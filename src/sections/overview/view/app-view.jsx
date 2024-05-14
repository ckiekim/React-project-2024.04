import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        대시보드 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="주간 매출" total={7148000} color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="신규 사용자" total={1352} color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="주문 건수" total={972} color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="버그 건수" total={34} color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits title="웹사이트 방문" subheader="전년 대비 +43%"
            chart={{
              labels: [ '01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023', '05/01/2023',
                '06/01/2023', '07/01/2023', '08/01/2023', '09/01/2023', '10/01/2023', '11/01/2023',
              ],
              series: [
                { name: 'Team A', type: 'column', fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                { name: 'Team B', type: 'area', fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                { name: 'Team C', type: 'line', fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="방문 횟수"
            chart={{
              series: [ { label: 'America', value: 4344 }, { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 }, { label: 'Africa', value: 4443 }, 
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates title="대화 비율" subheader="전년 대비 +28%"
            chart={{
              series: [ { label: 'Italy', value: 400 }, { label: 'Japan', value: 430 },
                { label: 'China', value: 448 }, { label: 'Canada', value: 470 },
                { label: 'France', value: 540 }, { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 }, { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 }, { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="시험 과목"
            chart={{
              categories: ['영어', '역사', '물리', '지리', '국어', '수학'],
              series: [
                { name: '1차 시험', data: [80, 50, 30, 40, 100, 20] },
                { name: '2차 시험', data: [20, 30, 40, 80, 20, 80] },
                { name: '최종 평가', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="최신 뉴스"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="시간별 주문내역"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="사이트별 트래픽"
            list={[
              { name: 'FaceBook', value: 32323,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              { name: 'Google', value: 841212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              { name: 'Linkedin', value: 41121,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              { name: 'Twitter', value: 243232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="태스크"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
